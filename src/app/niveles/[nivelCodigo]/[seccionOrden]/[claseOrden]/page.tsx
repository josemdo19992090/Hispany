import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getClasesPorSeccion,
  getVersionClase,
  getEjerciciosPorClase,
} from "@/lib/mock-data";
import type { PerfilAlumno } from "@/types/content";

const PERFILES: { valor: PerfilAlumno; etiqueta: string }[] = [
  { valor: "ninos", etiqueta: "Niños" },
  { valor: "trabajo_viajes", etiqueta: "Trabajo / Viajes" },
];

export default function ClasePage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string; seccionOrden: string; claseOrden: string };
  searchParams: { perfil?: string };
}) {
  const nivel = getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const seccion = getSeccionesPorNivel(nivel.id).find(
    (s) => String(s.orden) === params.seccionOrden
  );
  if (!seccion) notFound();

  const clase = getClasesPorSeccion(seccion.id).find(
    (c) => String(c.orden) === params.claseOrden
  );
  if (!clase) notFound();

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const version = getVersionClase(clase.id, perfilActivo);
  const ejerciciosClase = getEjerciciosPorClase(clase.id).filter(
    (e) => e.perfil === perfilActivo
  );

  return (
    <div>
      <Link
        href={`/niveles/${nivel.codigo}/${seccion.orden}`}
        className="text-sm font-semibold text-brand-blue"
      >
        &larr; {seccion.titulo}
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-extrabold">{clase.titulo}</h1>

      <div className="mb-6 flex gap-2">
        {PERFILES.map((p) => (
          <Link
            key={p.valor}
            href={`?perfil=${p.valor}`}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              perfilActivo === p.valor
                ? "bg-brand-green text-white"
                : "bg-white text-chigui-brown border-2 border-chigui-tan"
            }`}
          >
            {p.etiqueta}
          </Link>
        ))}
      </div>

      {!version ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Todavía no hay contenido de prueba para el perfil &quot;{perfilActivo}&quot; en esta
          clase.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <Bloque titulo="📖 Lectura" texto={version.lectura_md} />
          <Bloque titulo="💬 Conversación" texto={version.conversacion_md} />
          <Bloque titulo="📝 Gramática" texto={version.gramatica_md} />
          <Bloque titulo="✍️ Escritura" texto={version.escritura_md} />
        </div>
      )}

      <h2 className="mb-3 mt-8 text-lg font-bold">Ejercicios de comprobación</h2>
      {ejerciciosClase.length === 0 ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Sin ejercicios de prueba para este perfil todavía.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {ejerciciosClase.map((ej) => (
            <li
              key={ej.id}
              className="flex items-center justify-between rounded-xl2 border-2 border-chigui-tan bg-white p-3"
            >
              <span className="text-sm font-semibold capitalize">
                {ej.tipo.replaceAll("_", " ")}
              </span>
              {ej.is_premium && (
                <span className="rounded-full bg-chigui-brown-dark px-2 py-0.5 text-xs font-bold text-white">
                  🔒 Premium
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Bloque({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="rounded-xl2 bg-white p-4 shadow-sm">
      <p className="mb-1 font-bold">{titulo}</p>
      <p className="text-sm text-chigui-brown">{texto}</p>
    </div>
  );
}
