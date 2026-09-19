import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getClasesPorSeccion,
  getVersionClase,
  getEjerciciosPorClase,
} from "@/lib/data";
import type { PerfilAlumno } from "@/types/content";
import ClaseExercisePlayer from "@/components/exercises/ClaseExercisePlayer";

const PERFILES: { valor: PerfilAlumno; etiqueta: string }[] = [
  { valor: "ninos", etiqueta: "Niños" },
  { valor: "trabajo_viajes", etiqueta: "Trabajo / Viajes" },
];

export default async function ClasePage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string; seccionOrden: string; claseOrden: string };
  searchParams: { perfil?: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const seccionesDelNivel = await getSeccionesPorNivel(nivel.id);
  const seccion = seccionesDelNivel.find((s) => String(s.orden) === params.seccionOrden);
  if (!seccion) notFound();

  const clasesDeSeccion = await getClasesPorSeccion(seccion.id);
  const clase = clasesDeSeccion.find((c) => String(c.orden) === params.claseOrden);
  if (!clase) notFound();

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const version = await getVersionClase(clase.id, perfilActivo);
  const ejerciciosDeClase = await getEjerciciosPorClase(clase.id);
  const ejerciciosClase = ejerciciosDeClase.filter((e) => e.perfil === perfilActivo);

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
        <ClaseExercisePlayer
          key={`${clase.id}-${perfilActivo}`}
          claseId={clase.id}
          seccionId={seccion.id}
          ejercicios={ejerciciosClase}
        />
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
