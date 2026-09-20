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

// Nota de pronunciación solo para rusohablantes: compara sonidos difíciles
// del español con el ruso. Es igual para los dos perfiles porque el
// abecedario no cambia entre niños y adultos — solo cambia el tono del resto
// de la clase. Ver notas_ru en ClaseVersion (src/types/content.ts) para el
// porqué de este campo separado del contenido en español.
const NOTAS_RU_ABECEDARIO = `Сложные буквы и особенности испанского алфавита 🇪🇸
Некоторые буквы работают не так, как в русском — вот на что обратить внимание:

🔸 B и V — звучат ОДИНАКОВО (в отличие от русского, где б и в разные звуки)
bueno и vaso — оба начинаются с мягкого звука «б», без сильного нажима губ

🔸 C — два звука:
перед a, o, u звучит как «к»: casa (ка-са), copa (ко-па)
перед e, i — произношение зависит от страны: в Латинской Америке, Андалусии и на Канарах — «с» (cielo, cena); в остальной Испании — межзубное «с» (язык между зубами, похоже на английское th). Оба варианта правильные — это региональная норма (distinción в Испании, seseo в Латинской Америке)

🔸 G — два звука в зависимости от следующей буквы:
перед e, i звучит как «х» (как J): gente (хэн-тэ), girar (хи-рар)
перед a, o, u звучит как русская «г»: gato (га-то), amigo (а-ми-го)

🔸 GU — перед e, i буква U не произносится: guitarra (ги-тарра), guerra (гэ-рра)
⚠️ Исключение: если над u стоят две точки (ü), звук возвращается — pingüino (пин-гуи-но)

🔸 H — почти всегда немая буква, не произносится: hola (о-ла), hermano (эр-ма-но). Звучит только в некоторых заимствованных словах (напр. hámster)

🔸 J — звучит как русская «х», но более резко и с придыханием: jamón (ха-мон), jugo (ху-го)

🔸 LL — произношение сильно зависит от страны: в большинстве стран — как русская «й» (llamar, lluvia — это называется yeísmo, так говорит большинство испаноговорящих); в Аргентине и Уругвае — как «ж» или «ш» (llamar → жа-мар/ша-мар)

🔸 Ñ — мягкая «нь», отдельная буква (не n + мягкий знак): año (а-ньо), niño (ни-ньо)

🔸 QU — буква U не произносится, звучит просто как «к»: queso (кэ-со), aquí (а-ки)
💡 Сочетание C + e/i никогда не даёт звук «к» в испанском

🔸 Y — может быть гласной («и») или согласной (звук «й», как LL): y (и — союз «и»), yo (йо — «я»)

🔸 Z — та же особенность, что у C перед e/i: «с» в Латинской Америке и Андалусии, межзубное «с» в остальной Испании: zapato

💡 Совет: не пытайся запомнить всё сразу — эти правила закрепятся сами по мере практики, а звучание отличается от страны к стране`;

export const claseVersiones: ClaseVersion[] = [
  {
    id: "a1-s0-c1-ninos",
    clase_id: "a1-s0-c1",
    perfil: "ninos",
    lectura_md:
      "¡Vamos a conocer las letras del español! El español tiene 27 letras y, casi siempre, cada una suena igual sin importar dónde esté en la palabra.\n\nHay una letra muy especial que no existe en otros idiomas: la **Ñ**. Tiene una rayita ondulada arriba (la *virgulilla*) y suena distinto a la N: *niño*, *año*, *Chigui es muy risueño*.\n\nOtra letra curiosa es la **H**: nunca se pronuncia. Es una letra silenciosa.",
    conversacion_md:
      "Con un compañero, digan su nombre deletreando letra por letra. Por ejemplo: CHIGUI se dice CHE-HACHE-I-GE-U-I. Túrnense para adivinar qué nombre deletreó el otro.",
    gramatica_md:
      "Las **vocales** (a, e, i, o, u) siempre suenan igual, cortas y claras — nunca se alargan como en inglés.\n\nLas **consonantes** casi siempre suenan como se espera, pero hay grupos con reglas fijas:\nca, que, qui, co, cu suenan como \"k\"\nza, ce, ci, zo, zu tienen un sonido propio (cambia según el país)\nga, gue, gui, go, gu suenan con la \"g\" fuerte; ge, gi suenan como una \"j\"\nja, je, ji, jo, ju siempre suenan fuerte, como una \"j\" con aire\n\nLa **H** nunca suena. La **Ñ** es una letra propia del español.",
    escritura_md:
      "Escribe tu nombre completo y, debajo, deletréalo letra por letra, como hiciste en el ejercicio de conversación.",
    notas_ru: NOTAS_RU_ABECEDARIO,
    imagen_url: null,
    audio_url: null,
  },
  {
    id: "a1-s0-c1-trabajo",
    clase_id: "a1-s0-c1",
    perfil: "trabajo_viajes",
    lectura_md:
      "El español usa el alfabeto latino: 27 letras, de la A a la Z. Casi todas se pronuncian siempre igual — algo que no pasa en inglés, donde una misma letra suena distinto según la palabra.\n\nUna letra no tiene equivalente en otros idiomas: la **Ñ** (con la *virgulilla*, esa rayita ondulada arriba), como en *señor* o *compañía*. Otra particularidad: la **H** nunca se pronuncia.",
    conversacion_md:
      'Practica deletreando en voz alta tu nombre, apellido y correo electrónico. "¿Cómo se escribe?" es una de las preguntas más comunes en el trabajo, sobre todo por teléfono.',
    gramatica_md:
      "Las **vocales** (a, e, i, o, u) siempre suenan igual, cortas y claras — a diferencia del inglés, no se alargan ni cambian de sonido.\n\nLas **consonantes** casi siempre coinciden con lo esperado, salvo estos grupos:\nca, que, qui, co, cu suenan como \"k\"\nza, ce, ci, zo, zu tienen un sonido propio (varía según el país)\nga, gue, gui, go, gu suenan con la \"g\" fuerte; ge, gi suenan como una \"j\"\nja, je, ji, jo, ju siempre suenan fuerte, como una \"j\" aspirada\n\nLa **H** nunca se pronuncia. La **Ñ** es exclusiva del español.",
    escritura_md: "Escribe cómo deletrearías tu correo electrónico en español, letra por letra.",
    notas_ru: NOTAS_RU_ABECEDARIO,
    imagen_url: null,
    audio_url: null,
  },
  {
    id: "a1-s1-c1-ninos",
    clase_id: "a1-s1-c1",
    perfil: "ninos",
    lectura_md: "Chigui saluda a sus amigos del río: **¡Hola! ¿Cómo estás?**",
    conversacion_md: "Practica con un amigo: uno saluda, el otro responde.",
    gramatica_md: "El verbo *estar* para expresar cómo nos sentimos.",
    escritura_md: "Dibuja a Chigui y escribe cómo se siente hoy.",
    notas_ru: null,
    imagen_url: null,
    audio_url: null,
  },
  {
    id: "a1-s1-c1-trabajo",
    clase_id: "a1-s1-c1",
    perfil: "trabajo_viajes",
    lectura_md: "En una reunión de trabajo: **Hola, ¿cómo está usted?**",
    conversacion_md: "Simula un primer saludo formal en una oficina.",
    gramatica_md: "Formal vs. informal: *tú* / *usted* con el verbo *estar*.",
    escritura_md: "Escribe un correo breve de presentación.",
    notas_ru: null,
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
