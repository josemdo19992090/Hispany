import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ClipboardCheck, Lock } from "lucide-react";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getClasesPorSeccion,
  getClasesCompletadas,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import ChiguiMascot from "@/components/ChiguiMascot";
import Texto from "@/components/ui/Texto";
import { obtenerIdioma } from "@/lib/i18n/server";

export default async function SeccionPage({
  params,
}: {
  params: { nivelCodigo: string; seccionOrden: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const seccionesDelNivel = await getSeccionesPorNivel(nivel.id);
  const seccion = seccionesDelNivel.find((s) => String(s.orden) === params.seccionOrden);
  if (!seccion) notFound();

  const clasesDeSeccion = await getClasesPorSeccion(seccion.id);

  const supabase = await createSupabaseServerClient();
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);
  const bloqueada = !seccion.es_gratis && !esPremium;
  const idioma = await obtenerIdioma();

  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const completadas =
    user && supabase && !bloqueada
      ? await getClasesCompletadas(supabase, user.id, seccion.id)
      : new Set<string>();

  return (
    <div>
      <Link
        href={`/niveles/${nivel.codigo}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {nivel.nombre}
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-extrabold">{seccion.titulo}</h1>

      {clasesDeSeccion.length === 0 ? (
        <div className="rounded-card bg-white p-6 text-center shadow-soft">
          <ChiguiMascot className="mx-auto mb-3 h-20 w-20" pose="durmiendo" />
          <Texto clave="sinClasesTodavia" as="p" className="text-chigui-brown" />
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {clasesDeSeccion.map((clase) => {
            const hecha = completadas.has(clase.id);

            if (bloqueada) {
              return (
                <li key={clase.id}>
                  <div className="flex items-center gap-4 rounded-card bg-white/60 p-4 ring-1 ring-chigui-tan/40">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chigui-tan/60 text-white">
                      <Lock className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <p className="flex-1 font-bold text-chigui-brown">{clase.titulo}</p>
                  </div>
                </li>
              );
            }

            return (
              <li key={clase.id}>
                <Link
                  href={`/niveles/${nivel.codigo}/${seccion.orden}/${clase.orden}`}
                  className="flex items-center gap-4 rounded-card bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${
                      hecha ? "bg-brand-green text-white" : "bg-chigui-cream text-chigui-brown-dark"
                    }`}
                  >
                    {hecha ? <Check className="h-5 w-5" aria-hidden="true" /> : clase.orden}
                  </span>
                  <p className="flex-1 font-bold">{clase.titulo}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      )}

      {bloqueada && (
        <div className="mt-4">
          <ContenidoBloqueado mensajeClave="mensajeSeccionPremium" idioma={idioma} />
        </div>
      )}

      {!bloqueada && clasesDeSeccion.length > 0 && (
        <Link
          href={`/niveles/${nivel.codigo}/${seccion.orden}/prueba`}
          className="mt-6 flex items-center justify-center gap-2 rounded-card bg-white p-4 text-center text-sm font-bold text-chigui-brown shadow-soft transition hover:-translate-y-0.5 hover:text-brand-green hover:shadow-soft-lg"
        >
          <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
          <Texto clave="pruebaDeCierre" />
        </Link>
      )}
    </div>
  );
}
