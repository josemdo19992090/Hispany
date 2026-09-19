import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNivelPorCodigo, getEjerciciosPorNivel, getUsuarioActual } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import SelectorPerfil from "@/components/SelectorPerfil";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui } from "@/lib/i18n/diccionario";

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
      <Link
        href={`/niveles/${nivel.codigo}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {nivel.nombre}
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">{ui.pruebaFinalTitulo.es}</h1>
    </>
  );

  // La prueba final mezcla todas las secciones del nivel, incluidas las de pago,
  // así que es premium completa (antes quedaba abierta por descuido).
  if (!esPremium) {
    return (
      <div>
        {encabezado}
        <p className="mb-6 text-chigui-brown">
          {ui.mezclaTodasLasSecciones.es} ({nivel.nombre}).
        </p>
        <ContenidoBloqueado mensajeClave="mensajePruebaFinalPremium" />
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
        {ui.mezclaTodasLasSecciones.es} ({nivel.nombre}). {ui.necesitas60Aprobar.es}.
        <br />
        <span className="opacity-70">
          {ui.mezclaTodasLasSecciones.ru} ({nivel.nombre}). {ui.necesitas60Aprobar.ru}.
        </span>
      </p>

      <SelectorPerfil perfilActivo={perfilActivo} />

      {ejerciciosPerfil.length === 0 ? (
        <div className="rounded-card bg-white p-4 shadow-soft">
          <TextoBilingue clave="sinEjerciciosPrueba" as="p" className="text-chigui-brown" />
        </div>
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
