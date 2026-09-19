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

export type EjercicioContenido =
  | { tipo: "opcion_multiple"; pregunta: string; opciones: string[]; respuesta_correcta: number }
  | { tipo: "completar_espacio"; texto: string; respuestas: string[] }
  | { tipo: "emparejar"; pares: { izquierda: string; derecha: string }[] }
  | { tipo: "ordenar_palabras"; palabras: string[]; orden_correcto: number[] }
  | { tipo: "verdadero_falso"; afirmacion: string; es_verdadero: boolean }
  | { tipo: "encontrar_error"; texto: string; palabra_incorrecta: string; correccion: string };

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
