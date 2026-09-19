import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getNivelPorCodigo, getEjerciciosPorNivel, getUsuarioActual } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import { resolverPerfilActivo } from "@/lib/perfil";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import SelectorPerfil from "@/components/SelectorPerfil";
import Texto from "@/components/ui/Texto";
import { ui } from "@/lib/i18n/diccionario";
import { obtenerIdioma } from "@/lib/i18n/server";
import { nombreNivel } from "@/lib/i18n/contenido";

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
  const idioma = await obtenerIdioma();

  const encabezado = (
    <>
      <Link
        href={`/niveles/${nivel.codigo}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {nombreNivel(nivel, idioma)}
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">{ui.pruebaFinalTitulo[idioma]}</h1>
    </>
  );

  // La prueba final mezcla todas las secciones del nivel, incluidas las de pago,
  // así que es premium completa (antes quedaba abierta por descuido).
  if (!esPremium) {
    return (
      <div>
        {encabezado}
        <p className="mb-6 text-chigui-brown">
          {ui.mezclaTodasLasSecciones[idioma]} ({nombreNivel(nivel, idioma)}).
        </p>
        <ContenidoBloqueado mensajeClave="mensajePruebaFinalPremium" idioma={idioma} />
      </div>
    );
  }

  const perfilActivo = resolverPerfilActivo(searchParams.perfil, usuario);

  const ejerciciosNivel = await getEjerciciosPorNivel(nivel.id);
  const ejerciciosPerfil = ejerciciosNivel.filter((e) => e.perfil === perfilActivo);

  return (
    <div>
      {encabezado}
      <p className="mb-6 text-chigui-brown">
        {ui.mezclaTodasLasSecciones[idioma]} ({nombreNivel(nivel, idioma)}). {ui.necesitas60Aprobar[idioma]}.
      </p>

      <SelectorPerfil perfilActivo={perfilActivo} idioma={idioma} />

      {ejerciciosPerfil.length === 0 ? (
        <div className="rounded-card bg-white p-4 shadow-soft">
          <Texto clave="sinEjerciciosPrueba" as="p" className="text-chigui-brown" />
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
