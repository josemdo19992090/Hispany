import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUsuarioActual, getVersionClase } from "@/lib/data";
import { calcularEstadoPremium } from "@/lib/premium";
import ClasePDFDocument from "@/lib/pdf/ClasePDFDocument";
import { obtenerIdioma } from "@/lib/i18n/server";
import type { PerfilAlumno } from "@/types/content";

export async function GET(
  request: NextRequest,
  { params }: { params: { claseId: string } }
) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase no configurado." }, { status: 500 });
  }

  const usuario = await getUsuarioActual(supabase);
  const { esPremium } = calcularEstadoPremium(usuario);
  if (!esPremium) {
    return NextResponse.json(
      { error: "El PDF de explicaciones es una función premium." },
      { status: 403 }
    );
  }

  const perfil = (request.nextUrl.searchParams.get("perfil") ?? "ninos") as PerfilAlumno;

  const { data: clase } = await supabase
    .from("clases")
    .select("*, secciones(*, niveles(*))")
    .eq("id", params.claseId)
    .single();
  if (!clase) {
    return NextResponse.json({ error: "Clase no encontrada." }, { status: 404 });
  }

  const version = await getVersionClase(clase.id, perfil);
  if (!version) {
    return NextResponse.json(
      { error: "No hay contenido para este perfil todavía." },
      { status: 404 }
    );
  }

  const etiquetaPerfil = perfil === "ninos" ? "Niños" : "Trabajo / Viajes";
  const idioma = await obtenerIdioma();

  const buffer = await renderToBuffer(
    <ClasePDFDocument
      nivelNombre={clase.secciones.niveles.nombre}
      seccionTitulo={clase.secciones.titulo}
      claseTitulo={clase.titulo}
      version={version}
      perfilEtiqueta={etiquetaPerfil}
      idioma={idioma}
    />
  );

  const nombreArchivo = `hispany-${clase.titulo.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}.pdf`;

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${nombreArchivo}"`,
    },
  });
}
