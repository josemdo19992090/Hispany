import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Ejercicio, EjercicioContenido, PerfilAlumno, TipoEjercicio } from "@/types/content";

export const PLANTILLA_CONTENIDO: Record<TipoEjercicio, EjercicioContenido> = {
  opcion_multiple: {
    tipo: "opcion_multiple",
    pregunta: "¿Pregunta?",
    opciones: ["Opción A", "Opción B", "Opción C"],
    respuesta_correcta: 0,
  },
  completar_espacio: {
    tipo: "completar_espacio",
    texto: "Frase con un ___ que completar.",
    respuestas: ["espacio"],
  },
  emparejar: {
    tipo: "emparejar",
    pares: [
      { izquierda: "Uno", derecha: "One" },
      { izquierda: "Dos", derecha: "Two" },
    ],
  },
  ordenar_palabras: {
    tipo: "ordenar_palabras",
    palabras: ["Estas", "palabras", "desordenadas", "están"],
    orden_correcto: [0, 1, 3, 2],
  },
  verdadero_falso: {
    tipo: "verdadero_falso",
    afirmacion: "Esta afirmación es...",
    es_verdadero: true,
  },
  encontrar_error: {
    tipo: "encontrar_error",
    texto: "Esta frase tiene un heror",
    palabra_incorrecta: "heror",
    correccion: "error",
  },
};

interface ContenedorEjercicio {
  claseId?: string;
  seccionId?: string;
  nivelId?: string;
}

export async function listarEjercicios(contenedor: ContenedorEjercicio): Promise<Ejercicio[]> {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return [];
  let query = supabase.from("ejercicios").select("*").order("orden");
  if (contenedor.claseId) query = query.eq("clase_id", contenedor.claseId);
  if (contenedor.seccionId) query = query.eq("seccion_id", contenedor.seccionId);
  if (contenedor.nivelId) query = query.eq("nivel_id", contenedor.nivelId);
  const { data, error } = await query;
  if (error) throw error;
  return data as Ejercicio[];
}

export async function crearEjercicio(params: {
  contenedor: ContenedorEjercicio;
  perfil: PerfilAlumno;
  tipo: TipoEjercicio;
  orden: number;
  contenido: EjercicioContenido;
  is_premium: boolean;
}) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase no configurado");
  const { error } = await supabase.from("ejercicios").insert({
    clase_id: params.contenedor.claseId ?? null,
    seccion_id: params.contenedor.seccionId ?? null,
    nivel_id: params.contenedor.nivelId ?? null,
    perfil: params.perfil,
    tipo: params.tipo,
    orden: params.orden,
    contenido: params.contenido,
    is_premium: params.is_premium,
  });
  if (error) throw error;
}

export async function actualizarEjercicio(
  id: string,
  cambios: Partial<Pick<Ejercicio, "orden" | "is_premium" | "contenido">>
) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase no configurado");
  const { error } = await supabase.from("ejercicios").update(cambios).eq("id", id);
  if (error) throw error;
}

export async function borrarEjercicio(id: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) throw new Error("Supabase no configurado");
  const { error } = await supabase.from("ejercicios").delete().eq("id", id);
  if (error) throw error;
}
