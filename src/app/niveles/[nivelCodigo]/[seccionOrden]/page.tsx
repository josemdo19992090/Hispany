import Link from "next/link";
import { notFound } from "next/navigation";
import { getNivelPorCodigo, getSeccionesPorNivel, getClasesPorSeccion } from "@/lib/data";

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

  return (
    <div>
      <Link href={`/niveles/${nivel.codigo}`} className="text-sm font-semibold text-brand-blue">
        &larr; {nivel.nombre}
      </Link>
      <h1 className="mb-6 mt-2 text-2xl font-extrabold">{seccion.titulo}</h1>

      {clasesDeSeccion.length === 0 ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Todavía no hay clases cargadas para esta sección (datos de prueba pendientes).
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {clasesDeSeccion.map((clase) => (
            <li key={clase.id}>
              <Link
                href={`/niveles/${nivel.codigo}/${seccion.orden}/${clase.orden}`}
                className="flex items-center gap-4 rounded-xl2 border-2 border-chigui-tan bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green font-bold text-white">
                  {clase.orden}
                </span>
                <p className="font-bold">{clase.titulo}</p>
              </Link>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-6 rounded-xl2 border-2 border-dashed border-chigui-tan p-4 text-sm text-chigui-brown">
        Prueba de cierre de sección (mezcla las 4 clases) — próximamente.
      </div>
    </div>
  );
}
