// Datos fijos del abecedario español: no cambian por perfil ni por clase, así
// que viven acá en vez de en Supabase (evita duplicar las mismas 27 letras en
// cada fila de clase_versiones). Usado por TablaAbecedario.tsx (web) y
// ClasePDFDocument.tsx (PDF) para no mantener dos copias que puedan divergir.
//
// `nota` solo aparece para las letras que suenan distinto a lo esperado por
// un rusohablante (comparación con sonidos del ruso) y se muestra solo con
// la interfaz en ruso.
export interface Letra {
  mayuscula: string;
  minuscula: string;
  nombre: string;
  sonido: string;
  ejemplo: string;
  nota?: string;
}

export const VOCALES: Letra[] = [
  { mayuscula: "A", minuscula: "a", nombre: "a", sonido: "/a/", ejemplo: "casa" },
  { mayuscula: "E", minuscula: "e", nombre: "e", sonido: "/e/", ejemplo: "mesa" },
  { mayuscula: "I", minuscula: "i", nombre: "i", sonido: "/i/", ejemplo: "libro" },
  { mayuscula: "O", minuscula: "o", nombre: "o", sonido: "/o/", ejemplo: "sol" },
  { mayuscula: "U", minuscula: "u", nombre: "u", sonido: "/u/", ejemplo: "luna" },
];

export const CONSONANTES: Letra[] = [
  {
    mayuscula: "B",
    minuscula: "b",
    nombre: "be",
    sonido: "/b/",
    ejemplo: "bueno",
    nota: "Звучит так же, как V — в испанском буквы B и V произносятся одинаково",
  },
  {
    mayuscula: "C",
    minuscula: "c",
    nombre: "ce",
    sonido: "/k/, /s~z/",
    ejemplo: "casa, cine",
    nota: "Перед a/o/u звучит как «к», а перед e/i — как «с» (в Латинской Америке) или межзубное «с» (в Испании)",
  },
  { mayuscula: "D", minuscula: "d", nombre: "de", sonido: "/d/", ejemplo: "dedo" },
  { mayuscula: "F", minuscula: "f", nombre: "efe", sonido: "/f/", ejemplo: "fruta" },
  {
    mayuscula: "G",
    minuscula: "g",
    nombre: "ge",
    sonido: "/g/, /x/",
    ejemplo: "gato, gente",
    nota: "Перед a/o/u звучит как русская «г», а перед e/i — как «х» (как буква J)",
  },
  {
    mayuscula: "H",
    minuscula: "h",
    nombre: "hache",
    sonido: "—",
    ejemplo: "hola",
    nota: "Немая буква, никогда не произносится",
  },
  {
    mayuscula: "J",
    minuscula: "j",
    nombre: "jota",
    sonido: "/x/",
    ejemplo: "jamón",
    nota: "Резкая «х» с придыханием",
  },
  { mayuscula: "K", minuscula: "k", nombre: "ka", sonido: "/k/", ejemplo: "kilo" },
  { mayuscula: "L", minuscula: "l", nombre: "ele", sonido: "/l/", ejemplo: "luz" },
  {
    mayuscula: "LL",
    minuscula: "ll",
    nombre: "elle",
    sonido: "/y~zh/",
    ejemplo: "lluvia",
    nota: "Как русская «й» — в большинстве стран, либо «ж/ш» — в Аргентине и Уругвае",
  },
  { mayuscula: "M", minuscula: "m", nombre: "eme", sonido: "/m/", ejemplo: "mano" },
  { mayuscula: "N", minuscula: "n", nombre: "ene", sonido: "/n/", ejemplo: "nube" },
  {
    mayuscula: "Ñ",
    minuscula: "ñ",
    nombre: "eñe",
    sonido: "/ny/",
    ejemplo: "niño",
    nota: "Мягкая «нь», отдельная буква — не существует в русском алфавите",
  },
  { mayuscula: "P", minuscula: "p", nombre: "pe", sonido: "/p/", ejemplo: "perro" },
  {
    mayuscula: "Q",
    minuscula: "q",
    nombre: "cu",
    sonido: "/k/",
    ejemplo: "queso",
    nota: "Всегда пишется с немой U (que, qui) — сама буква U не произносится",
  },
  { mayuscula: "R", minuscula: "r", nombre: "erre", sonido: "/r~rr/", ejemplo: "pero, perro" },
  { mayuscula: "S", minuscula: "s", nombre: "ese", sonido: "/s/", ejemplo: "sol" },
  { mayuscula: "T", minuscula: "t", nombre: "te", sonido: "/t/", ejemplo: "taza" },
  {
    mayuscula: "V",
    minuscula: "v",
    nombre: "uve",
    sonido: "/b/",
    ejemplo: "vaso",
    nota: "Звучит так же, как B, а не как русская В",
  },
  { mayuscula: "W", minuscula: "w", nombre: "uve doble", sonido: "/w~b/", ejemplo: "web" },
  { mayuscula: "X", minuscula: "x", nombre: "equis", sonido: "/ks/", ejemplo: "examen" },
  {
    mayuscula: "Y",
    minuscula: "y",
    nombre: "ye",
    sonido: "/i/, /j/",
    ejemplo: "y, yo",
    nota: "Как гласная звучит «и» (в слове «y»), а как согласная — «й» (в слове «yo»)",
  },
  {
    mayuscula: "Z",
    minuscula: "z",
    nombre: "zeta",
    sonido: "/s~z/",
    ejemplo: "zapato",
    nota: "Звучит так же, как C перед e/i: «с» (в Латинской Америке) или межзубное «с» (в Испании)",
  },
];
