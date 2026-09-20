import type {
  Clase,
  ClaseVersion,
  Ejercicio,
  EjercicioContenido,
  Nivel,
  Seccion,
} from "@/types/content";

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
    lectura_md:
      "El abecedario sirve para algo muy práctico: deletrear tu nombre en voz alta. Por eso cada letra tiene su propio nombre.",
    lectura_ru:
      "Алфавит нужен для практических вещей: продиктовать своё имя вслух. Поэтому у каждой буквы есть своё название.",
    conversacion_md:
      "Con un compañero, deletreen en voz alta sus nombres. Usa la tabla de abajo para recordar el nombre de cada letra.",
    conversacion_ru:
      "С напарником продиктуйте вслух свои имена. Используй таблицу ниже, чтобы вспомнить названия букв.",
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
    lectura_md:
      "El abecedario sirve para algo muy práctico: deletrear tu nombre o tu email en voz alta, por ejemplo por teléfono. Por eso cada letra tiene su propio nombre.",
    lectura_ru:
      "Алфавит нужен для практических вещей: продиктовать своё имя или email вслух, например по телефону. Поэтому у каждой буквы есть своё название.",
    conversacion_md:
      "Con tu compañero, deletreen en voz alta sus nombres y un email inventado. Usa la tabla de abajo para recordar el nombre de cada letra.",
    conversacion_ru:
      "Со своим напарником продиктуйте вслух свои имена и один придуманный email. Используй таблицу ниже, чтобы вспомнить названия букв.",
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

// 12 ejercicios cubriendo distintas letras y reglas (no solo H/Ñ), revisados
// dos veces por agentes especialistas: uno de pedagogía + ruso + español
// (idioma), otro de lógica pedagógica (secuencia, precisión). Ajustes de la
// segunda pasada: la pregunta de C ahora acota "en Latinoamérica" (igual que
// la de Z, ya bien acotada) porque el sonido varía por región y antes solo
// una de las dos preguntas lo aclaraba; el emparejar de sonidos usa notación
// consistente (antes mezclaba símbolos fonéticos con la palabra "muda"); la
// vieja pregunta de completar-espacio (G→gente→mismo sonido que J) pedía una
// inferencia de dos pasos poco razonable para la primera clase, se reemplazó
// por una de opción múltiple de un solo paso; y las dos de "encontrar error"
// tenían una corrección ambigua (nombraban la palabra clickeada pero no el
// sujeto real de la regla) — reescritas como oración completa.
//
// El abecedario no cambia entre perfiles, así que la misma lista se usa para
// ninos y trabajo_viajes. `emparejar` y `encontrar_error` (cuando texto es
// una frase de práctica real) no llevan _ru: ver el comentario en
// EjercicioContenido (src/types/content.ts) sobre cuándo corresponde el
// espejo en ruso.
const EJERCICIOS_ABECEDARIO: EjercicioContenido[] = [
  {
    tipo: "emparejar",
    pares: [
      { izquierda: "B", derecha: "bueno" },
      { izquierda: "LL", derecha: "lluvia" },
      { izquierda: "Ñ", derecha: "niño" },
      { izquierda: "J", derecha: "jamón" },
      { izquierda: "Q", derecha: "queso" },
    ],
  },
  {
    tipo: "verdadero_falso",
    afirmacion: "En español, B y V suenan igual.",
    afirmacion_ru: "В испанском B и V звучат одинаково.",
    es_verdadero: true,
  },
  {
    tipo: "verdadero_falso",
    afirmacion: "La LL suena parecido a la 'y' en la mayoría de países hispanohablantes.",
    afirmacion_ru: "Буква LL в большинстве испаноязычных стран звучит похоже на «й».",
    es_verdadero: true,
  },
  {
    tipo: "verdadero_falso",
    afirmacion: "La Y puede sonar como vocal (en 'y') o como consonante (en 'yo').",
    afirmacion_ru: "Буква Y может звучать как гласная (в 'y') или как согласная (в 'yo').",
    es_verdadero: true,
  },
  {
    tipo: "opcion_multiple",
    pregunta: "En 'queso', ¿qué pasa con la U?",
    pregunta_ru: "В слове 'queso', что происходит с буквой U?",
    opciones: ["Se pronuncia", "Es muda", "Se pronuncia como O"],
    respuesta_correcta: 1,
  },
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cómo suena la C en la palabra 'cine' en Latinoamérica?",
    pregunta_ru: "Как звучит буква C в слове 'cine' в Латинской Америке?",
    opciones: ["/k/", "/s/", "/g/"],
    respuesta_correcta: 1,
  },
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cómo suena la Z en 'zapato' en Latinoamérica?",
    pregunta_ru: "Как звучит Z в слове 'zapato' в Латинской Америке?",
    opciones: ["/s/", "/k/", "/g/"],
    respuesta_correcta: 0,
  },
  {
    tipo: "completar_espacio",
    texto: "La letra ___ no existe en el alfabeto inglés ni en el ruso, y aparece en la palabra 'niño'.",
    texto_ru: "Буквы ___ нет ни в английском, ни в русском алфавите, она есть в слове 'niño'.",
    respuestas: ["ñ"],
  },
  {
    // palabra_incorrecta tiene que ser un token idéntico en los dos textos
    // (acá, la letra K) para que siga siendo clickeable en la versión rusa.
    tipo: "encontrar_error",
    texto: "La H suena como una K fuerte.",
    texto_ru: "Буква H звучит как сильная K.",
    palabra_incorrecta: "K",
    correccion: "La H no suena: es una letra muda. No suena como la K.",
  },
  {
    tipo: "encontrar_error",
    texto: "La V suena distinta a la B en español.",
    texto_ru: "Буква V звучит иначе, чем B в испанском.",
    palabra_incorrecta: "B",
    correccion: "La V y la B suenan igual en español. No son distintas.",
  },
  {
    tipo: "emparejar",
    pares: [
      { izquierda: "/x/", derecha: "J" },
      { izquierda: "/b/", derecha: "V" },
      { izquierda: "/ny/", derecha: "Ñ" },
      { izquierda: "/k/", derecha: "Q" },
    ],
  },
  {
    tipo: "opcion_multiple",
    pregunta: "¿Cómo suena la G en la palabra 'gente'?",
    pregunta_ru: "Как звучит буква G в слове 'gente'?",
    opciones: ["/g/", "/x/", "/k/"],
    respuesta_correcta: 1,
  },
];

function ejerciciosAbecedario(perfil: "ninos" | "trabajo_viajes"): Ejercicio[] {
  return EJERCICIOS_ABECEDARIO.map((contenido, i) => ({
    id: `ej-abc-${i + 1}-${perfil}`,
    clase_id: "a1-s0-c1",
    seccion_id: null,
    nivel_id: null,
    perfil,
    tipo: contenido.tipo,
    orden: i + 1,
    contenido,
    imagen_url: null,
    audio_url: null,
    is_premium: false,
    es_variante_ia: false,
    estado_revision_ia: null,
    variante_base_id: null,
    created_at: new Date().toISOString(),
  }));
}

export const ejercicios: Ejercicio[] = [
  ...ejerciciosAbecedario("ninos"),
  ...ejerciciosAbecedario("trabajo_viajes"),
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
