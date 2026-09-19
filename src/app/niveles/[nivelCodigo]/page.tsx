import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ClipboardCheck, Lock, Star } from "lucide-react";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getProgresoSecciones,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import { NOMBRE_RANGO, type RangoMaestria } from "@/types/content";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui } from "@/lib/i18n/diccionario";

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

  const completadas = secciones.filter((s) => progreso[s.id]?.pasado).length;

  return (
    <div>
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <TextoBilingue clave="todosLosNiveles" modo="en_linea" />
      </Link>

      <h1 className="mb-1 mt-2 text-2xl font-extrabold">{nivel.nombre}</h1>
      <p className="mb-4 text-chigui-brown">{nivel.descripcion}</p>

      {user && (
        <div className="mb-6 rounded-card bg-white p-4 shadow-soft">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="text-sm font-bold">
              {ui.tuProgresoEn.es} {nivel.codigo}{" "}
              <span className="font-normal opacity-60">
                ({ui.tuProgresoEn.ru} {nivel.codigo})
              </span>
            </span>
            <span className="text-sm text-chigui-brown">
              {completadas} de {secciones.length}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-chigui-cream">
            <div
              className="h-full rounded-full bg-brand-green transition-all"
              style={{ width: `${(completadas / Math.max(secciones.length, 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Camino vertical: los nodos y la línea que los une hacen que se lea como
          una ruta de aprendizaje y no como una lista de tarjetas sueltas. */}
      <ol className="relative flex flex-col gap-3 pl-7">
        <span
          className="absolute bottom-6 left-[15px] top-6 w-0.5 bg-chigui-tan/50"
          aria-hidden="true"
        />

        {secciones.map((seccion) => {
          const bloqueada = !seccion.es_gratis && !esPremium;
          const prog = progreso[seccion.id];
          const pasada = prog?.pasado;

          return (
            <li key={seccion.id} className="relative">
              <span
                className={`absolute -left-7 top-4 z-[1] flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ring-4 ring-chigui-cream ${
                  pasada
                    ? "bg-brand-green text-white"
                    : bloqueada
                      ? "bg-chigui-tan/60 text-white"
                      : seccion.es_intro
                        ? "bg-brand-yellow text-chigui-brown-dark"
                        : "bg-white text-chigui-brown-dark shadow-soft"
                }`}
              >
                {pasada ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : bloqueada ? (
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                ) : seccion.es_intro ? (
                  <Star className="h-4 w-4" aria-hidden="true" />
                ) : (
                  seccion.orden
                )}
              </span>

              <Link
                href={`/niveles/${nivel.codigo}/${seccion.orden}`}
                className={`flex items-center gap-3 rounded-card p-4 transition ${
                  bloqueada
                    ? "bg-white/60 ring-1 ring-chigui-tan/40"
                    : "bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{seccion.titulo}</p>
                  <p className="text-xs text-chigui-brown">
                    {seccion.es_intro ? (
                      <TextoBilingue clave="introduccionDelNivel" modo="en_linea" />
                    ) : (
                      <TextoBilingue clave="seccion" modo="en_linea" />
                    )}
                  </p>
                </div>

                {prog && prog.rango > 0 && (
                  <span className="shrink-0 rounded-full bg-brand-blue px-2.5 py-1 text-xs font-bold text-white">
                    {NOMBRE_RANGO[prog.rango as RangoMaestria]}
                  </span>
                )}
                {bloqueada && (
                  <span className="shrink-0 text-xs font-bold text-chigui-brown">
                    <TextoBilingue clave="premium" modo="en_linea" />
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>

      <Link
        href={`/niveles/${nivel.codigo}/prueba-final`}
        className="mt-6 flex items-center justify-center gap-2 rounded-card bg-white p-4 text-center text-sm font-bold text-chigui-brown shadow-soft transition hover:-translate-y-0.5 hover:text-brand-green hover:shadow-soft-lg"
      >
        <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
        {ui.pruebaFinalDe.es} {nivel.codigo}{" "}
        <span className="opacity-70">
          ({ui.pruebaFinalDe.ru} {nivel.codigo})
        </span>
      </Link>
    </div>
  );
}
