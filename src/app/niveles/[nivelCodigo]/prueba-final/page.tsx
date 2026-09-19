import Link from "next/link";
import { notFound } from "next/navigation";
import { getNivelPorCodigo, getEjerciciosPorNivel, getUsuarioActual } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";

export default async function PruebaFinalNivelPage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string };
  searchParams: { perfil?: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const ejerciciosNivel = await getEjerciciosPorNivel(nivel.id);
  const ejerciciosPerfil = ejerciciosNivel.filter((e) => e.perfil === perfilActivo);

  const supabase = await createSupabaseServerClient();
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);

  return (
    <div>
      <Link href={`/niveles/${nivel.codigo}`} className="text-sm font-semibold text-brand-blue">
        &larr; {nivel.nombre}
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">Prueba final de nivel</h1>
      <p className="mb-6 text-chigui-brown">
        Mezcla todas las secciones de {nivel.nombre}. Necesitas 60% o más para aprobar.
      </p>

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
