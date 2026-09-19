import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getEjerciciosPorSeccion,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import { resolverPerfilActivo } from "@/lib/perfil";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import SelectorPerfil from "@/components/SelectorPerfil";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui } from "@/lib/i18n/diccionario";

export default async function PruebaSeccionPage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string; seccionOrden: string };
  searchParams: { perfil?: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const seccionesDelNivel = await getSeccionesPorNivel(nivel.id);
  const seccion = seccionesDelNivel.find((s) => String(s.orden) === params.seccionOrden);
  if (!seccion) notFound();

  const supabase = await createSupabaseServerClient();
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);
  const seccionBloqueada = !seccion.es_gratis && !esPremium;

  const enlaceVolver = (
    <Link
      href={`/niveles/${nivel.codigo}/${seccion.orden}`}
      className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {seccion.titulo}
    </Link>
  );

  if (seccionBloqueada) {
    return (
      <div>
        {enlaceVolver}
        <h1 className="mb-4 mt-2 text-2xl font-extrabold">
          {ui.pruebaDeCierre.es}
        </h1>
        <ContenidoBloqueado mensajeClave="mensajeSeccionPremium" />
      </div>
    );
  }

  const perfilActivo = resolverPerfilActivo(searchParams.perfil, usuario);

  const ejerciciosSeccion = await getEjerciciosPorSeccion(seccion.id);
  const ejerciciosPerfil = ejerciciosSeccion.filter((e) => e.perfil === perfilActivo);

  return (
    <div>
      {enlaceVolver}
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">
        {ui.pruebaDeCierre.es}{" "}
        <span className="text-lg font-normal opacity-60">({ui.pruebaDeCierre.ru})</span>
      </h1>
      <p className="mb-6 text-chigui-brown">
        {ui.necesitas60.es} (&quot;{seccion.titulo}&quot;).
        <br />
        <span className="opacity-70">
          {ui.necesitas60.ru} («{seccion.titulo}»).
        </span>
      </p>

      <SelectorPerfil perfilActivo={perfilActivo} />

      {ejerciciosPerfil.length === 0 ? (
        <div className="rounded-card bg-white p-4 shadow-soft">
          <TextoBilingue clave="sinEjerciciosPrueba" as="p" className="text-chigui-brown" />
        </div>
      ) : (
        <PruebaExercisePlayer
          key={`${seccion.id}-${perfilActivo}`}
          ejercicios={ejerciciosPerfil}
          seccionId={seccion.id}
          esPremium={esPremium}
        />
      )}
    </div>
  );
}
