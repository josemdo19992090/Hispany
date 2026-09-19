// Diccionario de la interfaz (chrome de la app: botones, menús, mensajes).
// NO es para el contenido pedagógico (lecturas, gramática, ejercicios) — eso
// se autoriza por separado cuando exista contenido real diseñado para
// alumnos rusohablantes.
//
// El panel /admin es solo para el dueño y se queda en español; no traducir
// nada ahí.

export const ui = {
  // Header / sesión
  iniciarSesion: { ru: "Войти", es: "Iniciar sesión" },
  crearCuenta: { ru: "Создать аккаунт", es: "Crear cuenta" },
  salir: { ru: "Выйти", es: "Salir" },

  // Login
  bienvenidoDeVuelta: { ru: "С возвращением!", es: "¡Bienvenido de vuelta!" },
  creaTuCuentaGratis: { ru: "Создай бесплатный аккаунт", es: "Crea tu cuenta gratis" },
  correo: { ru: "Эл. почта", es: "Correo" },
  contrasena: { ru: "Пароль", es: "Contraseña" },
  entrar: { ru: "Войти", es: "Entrar" },
  nombre: { ru: "Имя", es: "Nombre" },
  seguirSinCuenta: { ru: "Продолжить без аккаунта", es: "Seguir explorando sin cuenta" },

  // Home
  holaSoyChigui: { ru: "Привет! Я Чигуи", es: "¡Hola! Soy Chigui" },
  elgieNivel: {
    ru: "Выбери уровень, чтобы начать изучать испанский",
    es: "Elige un nivel para empezar a aprender español",
  },
  niveles: { ru: "Уровни", es: "Niveles" },

  // Nivel / sección
  todosLosNiveles: { ru: "Все уровни", es: "Todos los niveles" },
  tuProgresoEn: { ru: "Твой прогресс", es: "Tu progreso en" },
  introduccionDelNivel: { ru: "Введение в уровень", es: "Introducción del nivel" },
  seccion: { ru: "Раздел", es: "Sección" },
  pruebaFinalDe: { ru: "Итоговый тест", es: "Prueba final de" },
  pruebaDeCierre: { ru: "Тест по разделу", es: "Prueba de cierre de sección" },
  sinClasesTodavia: {
    ru: "В этом разделе пока нет уроков",
    es: "Esta sección todavía no tiene clases cargadas",
  },
  premium: { ru: "Премиум", es: "Premium" },

  // Clase
  lectura: { ru: "Чтение", es: "Lectura" },
  conversacion: { ru: "Разговор", es: "Conversación" },
  gramatica: { ru: "Грамматика", es: "Gramática" },
  escritura: { ru: "Письмо", es: "Escritura" },
  descargarPDF: { ru: "Скачать PDF с объяснениями", es: "Descargar PDF de explicaciones" },
  ejerciciosDeComprobacion: { ru: "Упражнения", es: "Ejercicios de comprobación" },
  sinContenidoPerfil: {
    ru: "Пока нет материала для этого профиля",
    es: "Todavía no hay contenido para el perfil seleccionado",
  },
  sinEjerciciosPerfil: {
    ru: "Пока нет упражнений для этого профиля",
    es: "Aún no hay ejercicios para este perfil",
  },
  sinEjerciciosPrueba: {
    ru: "Здесь пока нет вопросов для этого теста",
    es: "Todavía no hay ejercicios de prueba cargados",
  },
  necesitas60: {
    ru: "Нужно набрать минимум 60%, чтобы попытка засчиталась",
    es: "Necesitas 60% o más para que el intento cuente",
  },
  pruebaFinalTitulo: { ru: "Итоговый тест уровня", es: "Prueba final de nivel" },
  mezclaTodasLasSecciones: {
    ru: "Здесь собраны вопросы из всех разделов уровня",
    es: "Mezcla todas las secciones del nivel",
  },
  necesitas60Aprobar: {
    ru: "Нужно набрать минимум 60%, чтобы сдать тест",
    es: "Necesitas 60% o más para aprobar",
  },

  // Selector de perfil
  perfilNinos: { ru: "Дети", es: "Niños" },
  perfilTrabajoViajes: { ru: "Работа / Путешествия", es: "Trabajo / Viajes" },

  // Motor de ejercicios
  pregunta: { ru: "Вопрос", es: "Pregunta" },
  de: { ru: "из", es: "de" },
  comprobar: { ru: "Проверить", es: "Comprobar" },
  verdadero: { ru: "Верно", es: "Verdadero" },
  falso: { ru: "Неверно", es: "Falso" },
  empareja: { ru: "Соедини пары", es: "Empareja cada elemento con su pareja" },
  tocaIzquierdaLuegoDerecha: {
    ru: "Нажми слово слева, потом его пару справа",
    es: "Toca una palabra de la izquierda y luego su pareja de la derecha",
  },
  ordenaLasPalabras: { ru: "Собери фразу из слов", es: "Ordena las palabras para formar la frase" },
  tocaEnOrden: { ru: "Нажимай слова по порядку...", es: "Toca las palabras en orden..." },
  encuentraElError: { ru: "Найди ошибку", es: "Encuentra el error" },
  tocaLaPalabraIncorrecta: {
    ru: "Нажми на слово с ошибкой во фразе.",
    es: "Toca la palabra que está incorrecta en la frase.",
  },
  correcto: { ru: "Правильно!", es: "¡Correcto!" },
  casi: { ru: "Почти", es: "Casi" },
  respuestaCorrecta: { ru: "Правильный ответ", es: "Respuesta correcta" },
  siguiente: { ru: "Далее", es: "Siguiente" },
  verResumen: { ru: "Посмотреть итог", es: "Ver resumen" },
  bienHecho: { ru: "Отлично!", es: "¡Bien hecho!" },
  sigueRracticando: { ru: "Продолжай тренироваться", es: "Sigue practicando" },
  acertaste: { ru: "Правильных ответов", es: "Acertaste" },
  revisaTusErrores: { ru: "Разбор ошибок", es: "Revisa tus errores" },
  reintentar: { ru: "Попробовать снова", es: "Reintentar" },

  // Bloqueo premium
  contenidoPremium: { ru: "Премиум-контент", es: "Contenido premium" },
  mensajeSeccionPremium: {
    ru: "Этот раздел — премиум-контент. Первый раздел каждого уровня бесплатный; остальные открываются с премиум-аккаунтом.",
    es: "Esta sección es premium. La primera sección de cada nivel es gratis; el resto se desbloquea con una cuenta premium.",
  },
  mensajePruebaFinalPremium: {
    ru: "Итоговый тест повторяет все разделы уровня, включая премиум, поэтому он тоже премиум-контент.",
    es: "La prueba final de nivel repasa todas las secciones, incluidas las premium, así que forma parte del contenido premium.",
  },
  mensajeErroresPremium: {
    ru: "Разбор ошибок с правильными ответами — премиум-функция.",
    es: "El detalle de tus errores con las respuestas correctas es una función premium.",
  },
  mensajePdfPremium: {
    ru: "PDF с объяснениями создаётся автоматически и доступен только в премиум.",
    es: "El PDF de explicaciones se genera al vuelo y es una función premium.",
  },

  // Reportar error
  reportarError: { ru: "Сообщить об ошибке", es: "Reportar un error" },
  enviarReporte: { ru: "Отправить", es: "Enviar reporte" },
  cancelar: { ru: "Отмена", es: "Cancelar" },
  describeElError: {
    ru: "Опиши ошибку, которую заметил...",
    es: "Describe el error que encontraste...",
  },
  graciasRevisaremos: {
    ru: "Спасибо, мы проверим это упражнение",
    es: "Gracias, revisaremos este ejercicio",
  },
  iniciaSesionParaReportar: {
    ru: "Войди в аккаунт, чтобы сообщить об ошибке",
    es: "Inicia sesión para poder reportar un error",
  },
} as const;

export type ClaveUI = keyof typeof ui;

// Etiquetas de los 6 tipos de ejercicio (usadas como badge junto a "Pregunta
// X de Y"; separado de `ui` porque se indexa por TipoEjercicio, no por clave
// arbitraria).
export const etiquetaTipoEjercicio = {
  opcion_multiple: { ru: "Выбор ответа", es: "Opción múltiple" },
  completar_espacio: { ru: "Заполни пропуск", es: "Completar el espacio" },
  emparejar: { ru: "Сопоставь пары", es: "Emparejar" },
  ordenar_palabras: { ru: "Собери фразу", es: "Ordenar palabras" },
  verdadero_falso: { ru: "Верно / неверно", es: "Verdadero o falso" },
  encontrar_error: { ru: "Найди ошибку", es: "Encontrar el error" },
} as const;
