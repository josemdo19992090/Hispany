import Link from "next/link";
import { notFound } from "next/navigation";
import { getNivelPorCodigo, getSeccionesPorNivel, getEjerciciosPorSeccion } from "@/lib/data";
import type { PerfilAlumno } from "@/types/content";
import PruebaExercisePlayer from "@/components/exercises/PruebaExercisePlayer";

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

      {ejerciciosPerfil.length === 0 ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Todavía no hay ejercicios de prueba de cierre cargados para esta sección.
        </p>
      ) : (
        <PruebaExercisePlayer
          key={`${seccion.id}-${perfilActivo}`}
          ejercicios={ejerciciosPerfil}
          seccionId={seccion.id}
        />
      )}
    </div>
  );
}
