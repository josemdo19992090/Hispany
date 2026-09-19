import Link from "next/link";
import { notFound } from "next/navigation";
import { getNivelPorCodigo, getEjerciciosPorNivel, getUsuarioActual } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import SelectorPerfil from "@/components/SelectorPerfil";

export default async function PruebaFinalNivelPage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string };
  searchParams: { perfil?: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const supabase = await createSupabaseServerClient();
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);

  const encabezado = (
    <>
      <Link href={`/niveles/${nivel.codigo}`} className="text-sm font-semibold text-brand-blue">
        &larr; {nivel.nombre}
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">Prueba final de nivel</h1>
    </>
  );

  // La prueba final mezcla todas las secciones del nivel, incluidas las de pago,
  // así que es premium completa (antes quedaba abierta por descuido).
  if (!esPremium) {
    return (
      <div>
        {encabezado}
        <p className="mb-6 text-chigui-brown">Mezcla todas las secciones de {nivel.nombre}.</p>
        <ContenidoBloqueado mensaje="La prueba final de nivel repasa todas las secciones, incluidas las premium, así que forma parte del contenido premium." />
      </div>
    );
  }

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const ejerciciosNivel = await getEjerciciosPorNivel(nivel.id);
  const ejerciciosPerfil = ejerciciosNivel.filter((e) => e.perfil === perfilActivo);

  return (
    <div>
      {encabezado}
      <p className="mb-6 text-chigui-brown">
        Mezcla todas las secciones de {nivel.nombre}. Necesitas 60% o más para aprobar.
      </p>

      <SelectorPerfil perfilActivo={perfilActivo} />

      {ejerciciosPerfil.length === 0 ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Todavía no hay ejercicios de prueba final cargados para este nivel.
        </p>
      ) : (
        <PruebaExercisePlayer
          key={`${nivel.id}-${perfilActivo}`}
          ejercicios={ejerciciosPerfil}
          nivelId={nivel.id}
          esPremium={esPremium}
        />
      )}
    </div>
  );
}
