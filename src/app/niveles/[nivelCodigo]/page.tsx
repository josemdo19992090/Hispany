import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getProgresoSecciones,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import { NOMBRE_RANGO, type RangoMaestria } from "@/types/content";

export default async function NivelPage({
  params,
}: {
  params: { nivelCodigo: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const secciones = await getSeccionesPorNivel(nivel.id);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const progreso = user && supabase ? await getProgresoSecciones(supabase, user.id) : {};
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);

  return (
    <div>
      <Link href="/" className="text-sm font-semibold text-brand-blue">
        &larr; Todos los niveles
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">{nivel.nombre}</h1>
      <p className="mb-6 text-chigui-brown">{nivel.descripcion}</p>

      <ol className="flex flex-col gap-3">
        {secciones.map((seccion, i) => {
          const bloqueada = !seccion.es_gratis && !esPremium;
          const prog = progreso[seccion.id];
          return (
            <li key={seccion.id}>
              <Link
                href={`/niveles/${nivel.codigo}/${seccion.orden}`}
                className={`flex items-center gap-4 rounded-xl2 border-2 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  seccion.es_intro ? "border-brand-yellow" : "border-chigui-tan"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chigui-tan font-bold text-white">
                  {seccion.es_intro ? "★" : i}
                </span>
                <div className="flex-1">
                  <p className="font-bold">
                    {seccion.titulo} {prog?.pasado && "✅"}
                  </p>
                  <p className="text-xs text-chigui-brown">
                    {seccion.es_intro ? "Introducción del nivel" : "Sección"}
                  </p>
                </div>
                {prog && prog.rango > 0 && (
                  <span className="rounded-full bg-brand-blue px-2 py-0.5 text-xs font-bold text-white">
                    {NOMBRE_RANGO[prog.rango as RangoMaestria]}
                  </span>
                )}
                {bloqueada && (
                  <span className="rounded-full bg-chigui-brown-dark px-3 py-1 text-xs font-bold text-white">
                    🔒 Premium
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      <Link
        href={`/niveles/${nivel.codigo}/prueba-final`}
        className="mt-6 block rounded-xl2 border-2 border-dashed border-chigui-tan p-4 text-center text-sm font-bold text-chigui-brown hover:border-brand-green hover:text-brand-green"
      >
        📝 Prueba final de {nivel.codigo} (mezcla todas las secciones)
      </Link>
    </div>
  );
}
