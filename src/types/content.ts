// Tipos de dominio de Hispany. Reflejan 1:1 el esquema de Supabase (ver supabase/schema.sql)
// para que la capa de datos pueda pasar de mock a Supabase sin tocar los componentes.

export type PerfilAlumno = "ninos" | "trabajo_viajes";

export type TipoEjercicio =
  | "opcion_multiple"
  | "completar_espacio"
  | "emparejar"
  | "ordenar_palabras"
  | "verdadero_falso"
  | "encontrar_error";

export type EstadoRevisionIA = "pendiente" | "aprobado" | "rechazado";

export interface Nivel {
  id: string;
  codigo: string; // "A1", "A2", "B1"...
  nombre: string;
  orden: number;
  descripcion: string | null;
  // Metadata de navegación (nombre/descripción del nivel en la pantalla de
  // selección), no contenido pedagógico — por eso sí se traduce con el
  // selector de idioma. Puede faltar si el nivel aún no tiene traducción;
  // en ese caso se muestra el español como respaldo.
  nombre_ru: string | null;
  descripcion_ru: string | null;
}

export interface Seccion {
  id: string;
  nivel_id: string;
  orden: number;
  titulo: string;
  es_intro: boolean; // true para la sección de repaso/alfabeto que abre el nivel
  es_gratis: boolean; // true solo para la primera sección real de cada nivel
}

export interface Clase {
  id: string;
  seccion_id: string;
  orden: number; // 1..4
  titulo: string;
}

// Contenido de una clase para un perfil de alumno específico.
// Preparado para admitir más perfiles en el futuro sin romper nada.
export interface ClaseVersion {
  id: string;
  clase_id: string;
  perfil: PerfilAlumno;
  lectura_md: string;
  conversacion_md: string;
  gramatica_md: string;
  escritura_md: string;
  // Espejos en ruso, uno por bloque, todos opcionales con respaldo al
  // español (mismo patrón que nombre_ru/descripcion_ru en Nivel).
  //
  // La distinción no es "todo en español" vs "todo en ruso": es qué rol
  // cumple el texto. Cuando el bloque EXPLICA algo (una regla de
  // pronunciación, una instrucción de actividad), esa explicación debe
  // decirse en ruso si la interfaz está en ruso — un principiante A1 no
  // puede leer un párrafo largo en español todavía. Pero las palabras y
  // frases en español que son el OBJETO de la explicación (ejemplos,
  // vocabulario a aprender) se dejan tal cual en español dentro del texto
  // en ruso: eso es lo que hay que aprender, no se traduce.
  lectura_ru: string | null;
  conversacion_ru: string | null;
  gramatica_ru: string | null;
  escritura_ru: string | null;
  imagen_url: string | null; // preparado, sin uso todavía
  audio_url: string | null; // preparado, sin uso todavía
}

export interface Ejercicio {
  id: string;
  clase_id: string;
  seccion_id: string | null; // no-nulo si es un ejercicio de prueba de cierre de sección
  nivel_id: string | null; // no-nulo si es un ejercicio de prueba final de nivel
  perfil: PerfilAlumno;
  tipo: TipoEjercicio;
  orden: number;
  contenido: EjercicioContenido;
  imagen_url: string | null; // preparado, sin uso todavía
  audio_url: string | null; // preparado, sin uso todavía
  is_premium: boolean;
  es_variante_ia: boolean;
  estado_revision_ia: EstadoRevisionIA | null;
  variante_base_id: string | null; // ejercicio original del que se generó esta variante IA
  created_at: string;
}

// `_ru` es la pregunta/afirmación/instrucción del ejercicio EN RUSO, opcional
// con respaldo al español (mismo patrón que textoClase en src/lib/i18n/contenido.ts):
// la consigna es una explicación ("¿qué letra...?", "¿verdadero o falso...?")
// y un alumno que todavía no lee español no entiende qué le preguntan aunque
// cambie el toggle si esa consigna queda fija en español. Las opciones,
// afirmaciones o palabras que SON el español a evaluar (respuesta_correcta,
// opciones, palabras, pares) nunca se traducen — eso es lo que hay que saber.
export type EjercicioContenido =
  | {
      tipo: "opcion_multiple";
      pregunta: string;
      pregunta_ru?: string;
      opciones: string[];
      respuesta_correcta: number;
    }
  | { tipo: "completar_espacio"; texto: string; texto_ru?: string; respuestas: string[] }
  | { tipo: "emparejar"; pares: { izquierda: string; derecha: string }[] }
  | { tipo: "ordenar_palabras"; palabras: string[]; orden_correcto: number[] }
  | { tipo: "verdadero_falso"; afirmacion: string; afirmacion_ru?: string; es_verdadero: boolean }
  | {
      tipo: "encontrar_error";
      texto: string;
      // Solo tiene sentido cuando `texto` es una AFIRMACIÓN sobre una regla
      // (ej. "La H suena como una K fuerte") y no una frase española real
      // para practicar: en ese caso es una explicación como cualquier otra y
      // se traduce. `palabra_incorrecta` debe ser un token idéntico en ambos
      // textos (una letra suelta como "H" o "K") para que siga siendo
      // clickeable en la versión rusa. Si `texto` es una frase de práctica
      // real en español, NO se agrega texto_ru: ahí el objetivo es encontrar
      // el error en el español que se está aprendiendo, no en una traducción.
      texto_ru?: string;
      palabra_incorrecta: string;
      correccion: string;
    };

export interface ReporteEjercicio {
  id: string;
  ejercicio_id: string;
  usuario_id: string;
  mensaje: string;
  estado: "abierto" | "revisado" | "descartado";
  created_at: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  perfil: PerfilAlumno;
  rol: "estudiante" | "admin";
  es_premium: boolean;
  fecha_inicio: string;
}

export type RangoMaestria = 1 | 2 | 3 | 4 | 5;

export const NOMBRE_RANGO: Record<RangoMaestria, string> = {
  1: "Aprendiz",
  2: "Practicante",
  3: "Competente",
  4: "Avanzado",
  5: "Maestro",
};

export interface ProgresoSeccion {
  id: string;
  usuario_id: string;
  seccion_id: string;
  pasado: boolean; // true solo si completó todos los ejercicios
  repeticiones_aprobadas: number; // intentos con >= 60%, cada uno sube el rango
  rango: RangoMaestria;
}
