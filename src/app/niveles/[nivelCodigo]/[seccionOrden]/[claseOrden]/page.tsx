import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getClasesPorSeccion,
  getVersionClase,
  getEjerciciosPorClase,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import ClaseExercisePlayer from "@/components/exercises/ClaseExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";

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
        <h1 className="mb-4 mt-2 text-2xl font-extrabold">{clase.titulo}</h1>
        <ContenidoBloqueado mensaje="Esta sección es premium. La primera sección de cada nivel es gratis; el resto se desbloquea con una cuenta premium." />
      </div>
    );
  }

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const version = await getVersionClase(clase.id, perfilActivo);
  const ejerciciosDeClase = await getEjerciciosPorClase(clase.id);
  const ejerciciosClase = ejerciciosDeClase.filter((e) => e.perfil === perfilActivo);
  const ejerciciosJugables = ejerciciosClase.filter((e) => !e.is_premium || esPremium);
  const cantidadBloqueados = ejerciciosClase.length - ejerciciosJugables.length;

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

          {esPremium ? (
            <a
              href={`/api/pdf/clase/${clase.id}?perfil=${perfilActivo}`}
              className="flex items-center justify-center gap-2 rounded-xl2 border-2 border-brand-blue bg-white p-3 text-center text-sm font-bold text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              📄 Descargar PDF de explicaciones
            </a>
          ) : (
            <ContenidoBloqueado mensaje="El PDF de explicaciones se genera al vuelo y es una función premium." />
          )}
        </div>
      )}

      <h2 className="mb-3 mt-8 text-lg font-bold">Ejercicios de comprobación</h2>
      {ejerciciosJugables.length === 0 ? (
        <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
          Sin ejercicios de prueba para este perfil todavía.
        </p>
      ) : (
        <ClaseExercisePlayer
          key={`${clase.id}-${perfilActivo}`}
          claseId={clase.id}
          seccionId={seccion.id}
          ejercicios={ejerciciosJugables}
        />
      )}

      {cantidadBloqueados > 0 && (
        <p className="mt-4 rounded-xl2 border-2 border-dashed border-chigui-tan p-3 text-center text-sm text-chigui-brown">
          🔒 {cantidadBloqueados} variante{cantidadBloqueados > 1 ? "s" : ""} extra premium
          disponible{cantidadBloqueados > 1 ? "s" : ""} para practicar más.
        </p>
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
