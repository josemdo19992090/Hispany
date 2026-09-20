import type { Clase, ClaseVersion, Ejercicio, Nivel, Seccion } from "@/types/content";

// Datos de prueba para la Fase 1 (navegación Niveles -> Secciones -> Clases).
// La forma coincide exactamente con supabase/schema.sql para poder migrar
// a consultas reales sin tocar los componentes de UI.

export const niveles: Nivel[] = [
  {
    id: "nivel-a1",
    codigo: "A1",
    nombre: "A1 - Principiante",
    orden: 1,
    descripcion: "Los primeros pasos: alfabeto, saludos y frases básicas.",
    nombre_ru: "A1 - Начальный уровень",
    descripcion_ru: "Первые шаги: алфавит, приветствия и базовые фразы.",
  },
  {
    id: "nivel-a2",
    codigo: "A2",
    nombre: "A2 - Elemental",
    orden: 2,
    descripcion: "Conversaciones cotidianas y gramática esencial.",
    nombre_ru: "A2 - Элементарный уровень",
    descripcion_ru: "Повседневное общение и основы грамматики.",
  },
];

export const secciones: Seccion[] = [
  // A1
  { id: "a1-s0", nivel_id: "nivel-a1", orden: 0, titulo: "Alfabeto y sonidos", es_intro: true, es_gratis: true },
  { id: "a1-s1", nivel_id: "nivel-a1", orden: 1, titulo: "Saludos y presentaciones", es_intro: false, es_gratis: true },
  { id: "a1-s2", nivel_id: "nivel-a1", orden: 2, titulo: "La familia", es_intro: false, es_gratis: false },
  { id: "a1-s3", nivel_id: "nivel-a1", orden: 3, titulo: "Números y colores", es_intro: false, es_gratis: false },
  // A2
  { id: "a2-s0", nivel_id: "nivel-a2", orden: 0, titulo: "Repaso de A1", es_intro: true, es_gratis: true },
  { id: "a2-s1", nivel_id: "nivel-a2", orden: 1, titulo: "En el restaurante", es_intro: false, es_gratis: true },
  { id: "a2-s2", nivel_id: "nivel-a2", orden: 2, titulo: "De viaje", es_intro: false, es_gratis: false },
];

export const clases: Clase[] = [
  // A1 - Alfabeto y sonidos (sección intro)
  { id: "a1-s0-c1", seccion_id: "a1-s0", orden: 1, titulo: "El abecedario" },
  // A1 - Saludos y presentaciones
  { id: "a1-s1-c1", seccion_id: "a1-s1", orden: 1, titulo: "Hola, ¿cómo estás?" },
  { id: "a1-s1-c2", seccion_id: "a1-s1", orden: 2, titulo: "Mi nombre es..." },
  { id: "a1-s1-c3", seccion_id: "a1-s1", orden: 3, titulo: "¿De dónde eres?" },
  { id: "a1-s1-c4", seccion_id: "a1-s1", orden: 4, titulo: "Despedidas" },
  // A1 - La familia
  { id: "a1-s2-c1", seccion_id: "a1-s2", orden: 1, titulo: "Miembros de la familia" },
  { id: "a1-s2-c2", seccion_id: "a1-s2", orden: 2, titulo: "Describir a mi familia" },
  { id: "a1-s2-c3", seccion_id: "a1-s2", orden: 3, titulo: "Posesivos" },
  { id: "a1-s2-c4", seccion_id: "a1-s2", orden: 4, titulo: "Mi árbol familiar" },
  // A2 - En el restaurante
  { id: "a2-s1-c1", seccion_id: "a2-s1", orden: 1, titulo: "Pedir la comida" },
  { id: "a2-s1-c2", seccion_id: "a2-s1", orden: 2, titulo: "Hablar de gustos" },
  { id: "a2-s1-c3", seccion_id: "a2-s1", orden: 3, titulo: "El condicional simple" },
  { id: "a2-s1-c4", seccion_id: "a2-s1", orden: 4, titulo: "Pedir la cuenta" },
];

export const claseVersiones: ClaseVersion[] = [
  {
    id: "a1-s0-c1-ninos",
    clase_id: "a1-s0-c1",
    perfil: "ninos",
    lectura_md: "El español tiene 27 letras. Casi todas suenan igual siempre.",
    lectura_ru: "В испанском 27 букв. Почти все звучат одинаково всегда.",
    conversacion_md:
      "Deletrea tu nombre en voz alta con un compañero. Ejemplo: ANA = A-ENE-A.",
    conversacion_ru:
      "Продиктуй своё имя по буквам вслух с напарником. Пример: ANA = A-ENE-A.",
    gramatica_md: "Mirá la tabla: cada letra con su nombre, su sonido y un ejemplo.",
    gramatica_ru: "Смотри таблицу: каждая буква — с названием, звуком и примером.",
    escritura_md: "Escribe tu nombre y deletréalo debajo, letra por letra.",
    escritura_ru: "Напиши своё имя и продиктуй его ниже по буквам.",
    imagen_url: null,
    audio_url: null,
  },
  {
    id: "a1-s0-c1-trabajo",
    clase_id: "a1-s0-c1",
    perfil: "trabajo_viajes",
    lectura_md: "El español usa el alfabeto latino: 27 letras que casi siempre suenan igual.",
    lectura_ru: "В испанском используется латинский алфавит: 27 букв, которые почти всегда звучат одинаково.",
    conversacion_md:
      'Practica deletreando tu nombre y tu correo. En el trabajo es común escuchar: "¿Cómo se escribe?".',
    conversacion_ru:
      'Потренируйся диктовать по буквам своё имя и почту. На работе часто слышно: "¿Cómo se escribe?" (Как это пишется?).',
    gramatica_md: "Mirá la tabla: cada letra con su nombre, su sonido y un ejemplo.",
    gramatica_ru: "Смотри таблицу: каждая буква — с названием, звуком и примером.",
    escritura_md: "Escribe tu correo electrónico y deletréalo, letra por letra.",
    escritura_ru: "Напиши свой email и продиктуй его по буквам.",
    imagen_url: null,
    audio_url: null,
  },
  {
    id: "a1-s1-c1-ninos",
    clase_id: "a1-s1-c1",
    perfil: "ninos",
    lectura_md: "Chigui saluda a sus amigos del río: **¡Hola! ¿Cómo estás?**",
    lectura_ru: null,
    conversacion_md: "Practica con un amigo: uno saluda, el otro responde.",
    conversacion_ru: null,
    gramatica_md: "El verbo *estar* para expresar cómo nos sentimos.",
    gramatica_ru: null,
    escritura_md: "Dibuja a Chigui y escribe cómo se siente hoy.",
    escritura_ru: null,
    imagen_url: null,
    audio_url: null,
  },
  {
    id: "a1-s1-c1-trabajo",
    clase_id: "a1-s1-c1",
    perfil: "trabajo_viajes",
    lectura_md: "En una reunión de trabajo: **Hola, ¿cómo está usted?**",
    lectura_ru: null,
    conversacion_md: "Simula un primer saludo formal en una oficina.",
    conversacion_ru: null,
    gramatica_md: "Formal vs. informal: *tú* / *usted* con el verbo *estar*.",
    gramatica_ru: null,
    escritura_md: "Escribe un correo breve de presentación.",
    escritura_ru: null,
    imagen_url: null,
    audio_url: null,
  },
];

export const ejercicios: Ejercicio[] = [
  {
    id: "ej-abc-1-ninos",
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "ninos",
    tipo: "opcion_multiple",
    orden: 1,
    contenido: {
      tipo: "opcion_multiple",
      pregunta: "¿Qué letra nunca se pronuncia en español?",
      opciones: ["H", "Ñ", "J"],
      respuesta_correcta: 0,
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-abc-2-ninos",
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "ninos",
    tipo: "verdadero_falso",
    orden: 2,
    contenido: {
      tipo: "verdadero_falso",
      afirmacion: "La Ñ es una letra propia del español y no existe en el alfabeto inglés.",
      es_verdadero: true,
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-abc-3-ninos",
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "ninos",
    tipo: "completar_espacio",
    orden: 3,
    contenido: {
      tipo: "completar_espacio",
      texto: "La letra ___ suena como en la palabra 'niño'.",
      respuestas: ["ñ"],
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-abc-1-trabajo",
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "trabajo_viajes",
    tipo: "opcion_multiple",
    orden: 1,
    contenido: {
      tipo: "opcion_multiple",
      pregunta: "¿Qué letra nunca se pronuncia en español?",
      opciones: ["H", "Ñ", "J"],
      respuesta_correcta: 0,
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-abc-2-trabajo",
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "trabajo_viajes",
    tipo: "verdadero_falso",
    orden: 2,
    contenido: {
      tipo: "verdadero_falso",
      afirmacion: "La Ñ es una letra propia del español y no existe en el alfabeto inglés.",
      es_verdadero: true,
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-abc-3-trabajo",
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "trabajo_viajes",
    tipo: "completar_espacio",
    orden: 3,
    contenido: {
      tipo: "completar_espacio",
      texto: "La letra ___ suena como en la palabra 'niño'.",
      respuestas: ["ñ"],
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-1",
    clase_id: "a1-s1-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "ninos",
    tipo: "opcion_multiple",
    orden: 1,
    contenido: {
      tipo: "opcion_multiple",
      pregunta: "¿Cómo saluda Chigui a sus amigos?",
      opciones: ["¡Hola!", "Adiós", "Gracias"],
      respuesta_correcta: 0,
    },
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  },
  {
    id: "ej-2",
    clase_id: "a1-s1-c1",
    seccion_id: null,
    nivel_id: null,
    perfil: "ninos",
    tipo: "verdadero_falso",
    orden: 2,
    contenido: {
      tipo: "verdadero_falso",
      afirmacion: "Chigui es un capibara.",
      es_verdadero: true,
    },
    imagen_url: null,
    audio_url: null,
    is_premium: true,
    es_variante_ia: true,
    estado_revision_ia: "aprobado",
    variante_base_id: "ej-1",
    created_at: new Date().toISOString(),
  },
];

export function getNivelPorCodigo(codigo: string): Nivel | undefined {
  return niveles.find((n) => n.codigo.toLowerCase() === codigo.toLowerCase());
}

export function getSeccionesPorNivel(nivelId: string): Seccion[] {
  return secciones.filter((s) => s.nivel_id === nivelId).sort((a, b) => a.orden - b.orden);
}

export function getSeccionPorId(seccionId: string): Seccion | undefined {
  return secciones.find((s) => s.id === seccionId);
}

export function getClasesPorSeccion(seccionId: string): Clase[] {
  return clases.filter((c) => c.seccion_id === seccionId).sort((a, b) => a.orden - b.orden);
}

export function getClasePorId(claseId: string): Clase | undefined {
  return clases.find((c) => c.id === claseId);
}

export function getVersionClase(claseId: string, perfil: string): ClaseVersion | undefined {
  return claseVersiones.find((v) => v.clase_id === claseId && v.perfil === perfil);
}

export function getEjerciciosPorClase(claseId: string): Ejercicio[] {
  return ejercicios.filter((e) => e.clase_id === claseId).sort((a, b) => a.orden - b.orden);
}
