import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getEjerciciosPorSeccion,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import SelectorPerfil from "@/components/SelectorPerfil";

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

  if (seccionBloqueada) {
    return (
      <div>
        <Link
          href={`/niveles/${nivel.codigo}/${seccion.orden}`}
          className="text-sm font-semibold text-brand-blue"
        >
          &larr; {seccion.titulo}
        </Link>
        <h1 className="mb-4 mt-2 text-2xl font-extrabold">Prueba de cierre</h1>
        <ContenidoBloqueado mensaje="Esta sección es premium. La primera sección de cada nivel es gratis; el resto se desbloquea con una cuenta premium." />
      </div>
    );
  }

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const ejerciciosSeccion = await getEjerciciosPorSeccion(seccion.id);
  const ejerciciosPerfil = ejerciciosSeccion.filter((e) => e.perfil === perfilActivo);

  return (
    <div>
      <Link
        href={`/niveles/${nivel.codigo}/${seccion.orden}`}
        className="text-sm font-semibold text-brand-blue"
      >
        &larr; {seccion.titulo}
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">Prueba de cierre</h1>
      <p className="mb-6 text-chigui-brown">
        Mezcla las 4 clases de &quot;{seccion.titulo}&quot;. Necesitas 60% o más para que el
        intento cuente para tu rango.
      </p>

      <SelectorPerfil perfilActivo={perfilActivo} />

      {ejerciciosPerfil.length === 0 ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Todavía no hay ejercicios de prueba de cierre cargados para esta sección.
        </p>
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
