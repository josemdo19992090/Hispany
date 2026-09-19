import Link from "next/link";
import { notFound } from "next/navigation";
import { getNivelPorCodigo, getSeccionesPorNivel } from "@/lib/data";

export default async function NivelPage({
  params,
}: {
  params: { nivelCodigo: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const secciones = await getSeccionesPorNivel(nivel.id);

  return (
    <div>
      <Link href="/" className="text-sm font-semibold text-brand-blue">
        &larr; Todos los niveles
      </Link>
      <h1 className="mb-1 mt-2 text-2xl font-extrabold">{nivel.nombre}</h1>
      <p className="mb-6 text-chigui-brown">{nivel.descripcion}</p>

      <ol className="flex flex-col gap-3">
        {secciones.map((seccion, i) => {
          const bloqueada = !seccion.es_gratis;
          return (
            <li key={seccion.id}>
              <Link
                href={`/niveles/${nivel.codigo}/${seccion.orden}`}
                className={`flex items-center gap-4 rounded-xl2 border-2 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  seccion.es_intro ? "border-brand-yellow" : "border-chigui-tan"
                }`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-chigui-tan font-bold text-white">
                  {seccion.es_intro ? "★" : i}
                </span>
                <div className="flex-1">
                  <p className="font-bold">{seccion.titulo}</p>
                  <p className="text-xs text-chigui-brown">
                    {seccion.es_intro ? "Introducción del nivel" : "Sección"}
                  </p>
                </div>
                {bloqueada && (
                  <span className="rounded-full bg-chigui-brown-dark px-3 py-1 text-xs font-bold text-white">
                    🔒 Premium
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
