import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileDown,
  GraduationCap,
  Lock,
  MessagesSquare,
  PenLine,
} from "lucide-react";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getClasesPorSeccion,
  getVersionClase,
  getEjerciciosPorClase,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import ClaseExercisePlayer from "@/components/exercises/ClaseExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import TextoConFormato from "@/components/TextoConFormato";
import SelectorPerfil from "@/components/SelectorPerfil";
import ChiguiMascot from "@/components/ChiguiMascot";

export default async function ClasePage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string; seccionOrden: string; claseOrden: string };
  searchParams: { perfil?: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const seccionesDelNivel = await getSeccionesPorNivel(nivel.id);
  const seccion = seccionesDelNivel.find((s) => String(s.orden) === params.seccionOrden);
  if (!seccion) notFound();

  const clasesDeSeccion = await getClasesPorSeccion(seccion.id);
  const clase = clasesDeSeccion.find((c) => String(c.orden) === params.claseOrden);
  if (!clase) notFound();

  const supabase = await createSupabaseServerClient();
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);
  const seccionBloqueada = !seccion.es_gratis && !esPremium;

  if (seccionBloqueada) {
    return (
      <div>
        <Link
          href={`/niveles/${nivel.codigo}/${seccion.orden}`}
          className="text-sm font-semibold text-brand-blue"
        >
          &larr; {seccion.titulo}
        </Link>
        <h1 className="mb-4 mt-2 text-2xl font-extrabold">{clase.titulo}</h1>
        <ContenidoBloqueado mensaje="Esta sección es premium. La primera sección de cada nivel es gratis; el resto se desbloquea con una cuenta premium." />
      </div>
    );
  }

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const version = await getVersionClase(clase.id, perfilActivo);
  const ejerciciosDeClase = await getEjerciciosPorClase(clase.id);
  const ejerciciosClase = ejerciciosDeClase.filter((e) => e.perfil === perfilActivo);
  const ejerciciosJugables = ejerciciosClase.filter((e) => !e.is_premium || esPremium);
  const cantidadBloqueados = ejerciciosClase.length - ejerciciosJugables.length;

  return (
    <div>
      <Link
        href={`/niveles/${nivel.codigo}/${seccion.orden}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {seccion.titulo}
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-extrabold">{clase.titulo}</h1>

      <SelectorPerfil perfilActivo={perfilActivo} />

      {!version ? (
        <div className="rounded-card bg-white p-6 text-center shadow-soft">
          <ChiguiMascot className="mx-auto mb-3 h-20 w-20" pose="durmiendo" />
          <p className="text-chigui-brown">
            Todavía no hay contenido para el perfil seleccionado en esta clase.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Bloque icono={<BookOpen />} titulo="Lectura" texto={version.lectura_md} />
          <Bloque
            icono={<MessagesSquare />}
            titulo="Conversación"
            texto={version.conversacion_md}
          />
          <Bloque icono={<GraduationCap />} titulo="Gramática" texto={version.gramatica_md} />
          <Bloque icono={<PenLine />} titulo="Escritura" texto={version.escritura_md} />

          {esPremium ? (
            <a
              href={`/api/pdf/clase/${clase.id}?perfil=${perfilActivo}`}
              className="flex items-center justify-center gap-2 rounded-card bg-white p-4 text-center text-sm font-bold text-brand-blue shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              Descargar PDF de explicaciones
            </a>
          ) : (
            <ContenidoBloqueado mensaje="El PDF de explicaciones se genera al vuelo y es una función premium." />
          )}
        </div>
      )}

      <h2 className="mb-3 mt-8 text-lg font-bold">Ejercicios de comprobación</h2>
      {ejerciciosJugables.length === 0 ? (
        <div className="rounded-card bg-white p-6 text-center shadow-soft">
          <ChiguiMascot className="mx-auto mb-3 h-20 w-20" pose="durmiendo" />
          <p className="text-chigui-brown">
            Aún no hay ejercicios para este perfil.
          </p>
        </div>
      ) : (
        <ClaseExercisePlayer
          key={`${clase.id}-${perfilActivo}`}
          claseId={clase.id}
          seccionId={seccion.id}
          ejercicios={ejerciciosJugables}
        />
      )}

      {cantidadBloqueados > 0 && (
        <p className="mt-4 flex items-center justify-center gap-2 rounded-card bg-white/60 p-3 text-center text-sm text-chigui-brown ring-1 ring-chigui-tan/40">
          <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {cantidadBloqueados} variante{cantidadBloqueados > 1 ? "s" : ""} extra premium para
          practicar más
        </p>
      )}
    </div>
  );
}

function Bloque({
  icono,
  titulo,
  texto,
}: {
  icono: ReactNode;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="rounded-card bg-white p-5 shadow-soft">
      <p className="mb-2 flex items-center gap-2 font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-chigui-cream text-brand-green [&>svg]:h-4 [&>svg]:w-4">
          {icono}
        </span>
        {titulo}
      </p>
      <TextoConFormato texto={texto} className="text-chigui-brown" />
    </div>
  );
}
