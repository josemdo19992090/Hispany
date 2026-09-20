import type { Idioma } from "@/lib/i18n/idioma";

// El abecedario español no cambia por perfil ni por clase, así que va como
// dato fijo en el componente en vez de contenido versionado en Supabase
// (evita duplicar las mismas 27 letras en cada fila de clase_versiones).
//
// `nota` solo aparece para las letras que suenan distinto a lo esperado por
// un rusohablante (comparación con sonidos del ruso) — es la explicación
// que antes vivía en un bloque de texto aparte; ahora vive junto a la letra
// que explica, y solo se muestra con la interfaz en ruso.
interface Letra {
  mayuscula: string;
  minuscula: string;
  nombre: string;
  sonido: string;
  ejemplo: string;
  nota?: string;
}

const VOCALES: Letra[] = [
  { mayuscula: "A", minuscula: "a", nombre: "a", sonido: "/a/", ejemplo: "casa" },
  { mayuscula: "E", minuscula: "e", nombre: "e", sonido: "/e/", ejemplo: "mesa" },
  { mayuscula: "I", minuscula: "i", nombre: "i", sonido: "/i/", ejemplo: "libro" },
  { mayuscula: "O", minuscula: "o", nombre: "o", sonido: "/o/", ejemplo: "sol" },
  { mayuscula: "U", minuscula: "u", nombre: "u", sonido: "/u/", ejemplo: "luna" },
];

const CONSONANTES: Letra[] = [
  {
    mayuscula: "B",
    minuscula: "b",
    nombre: "be",
    sonido: "/b/",
    ejemplo: "bueno",
    nota: "Suena igual que la V — в испанском B и V звучат ОДИНАКОВО",
  },
  {
    mayuscula: "C",
    minuscula: "c",
    nombre: "ce",
    sonido: "/k/, /s~θ/",
    ejemplo: "casa, cine",
    nota: "Ante a/o/u = «к». Ante e/i: «с» (Латинская Америка) о межзубное «с» (Испания)",
  },
  { mayuscula: "D", minuscula: "d", nombre: "de", sonido: "/d/", ejemplo: "dedo" },
  { mayuscula: "F", minuscula: "f", nombre: "efe", sonido: "/f/", ejemplo: "fruta" },
  {
    mayuscula: "G",
    minuscula: "g",
    nombre: "ge",
    sonido: "/g/, /x/",
    ejemplo: "gato, gente",
    nota: "Ante a/o/u = русская «г». Ante e/i = «х» (как J)",
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
    sonido: "/j~ʝ/",
    ejemplo: "lluvia",
    nota: "Как русская «й» (большинство стран) или «ж/ш» (Аргентина, Уругвай)",
  },
  { mayuscula: "M", minuscula: "m", nombre: "eme", sonido: "/m/", ejemplo: "mano" },
  { mayuscula: "N", minuscula: "n", nombre: "ene", sonido: "/n/", ejemplo: "nube" },
  {
    mayuscula: "Ñ",
    minuscula: "ñ",
    nombre: "eñe",
    sonido: "/ɲ/",
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
    nota: "Siempre con U muda (que, qui) — буква U не произносится",
  },
  { mayuscula: "R", minuscula: "r", nombre: "erre", sonido: "/ɾ~r/", ejemplo: "pero, perro" },
  { mayuscula: "S", minuscula: "s", nombre: "ese", sonido: "/s/", ejemplo: "sol" },
  { mayuscula: "T", minuscula: "t", nombre: "te", sonido: "/t/", ejemplo: "taza" },
  {
    mayuscula: "V",
    minuscula: "v",
    nombre: "uve",
    sonido: "/b/",
    ejemplo: "vaso",
    nota: "Suena igual que la B, no como la В rusa",
  },
  { mayuscula: "W", minuscula: "w", nombre: "uve doble", sonido: "/w~b/", ejemplo: "web" },
  { mayuscula: "X", minuscula: "x", nombre: "equis", sonido: "/ks/", ejemplo: "examen" },
  {
    mayuscula: "Y",
    minuscula: "y",
    nombre: "ye",
    sonido: "/i/, /j/",
    ejemplo: "y, yo",
    nota: "Vocal («и», como en «y») o consonante («й», como en «yo»)",
  },
  {
    mayuscula: "Z",
    minuscula: "z",
    nombre: "zeta",
    sonido: "/s~θ/",
    ejemplo: "zapato",
    nota: "Igual que la C ante e/i: «с» (Латинская Америка) о межзубное «с» (Испания)",
  },
];

function TablaLetras({
  filas,
  idioma,
  encabezado,
}: {
  filas: Letra[];
  idioma: Idioma;
  encabezado: string;
}) {
  const conNotas = idioma === "ru";
  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-sm font-bold text-chigui-brown">{encabezado}</p>
      <table className="w-full min-w-[480px] border-separate border-spacing-y-1 text-left text-sm">
        <thead>
          <tr className="text-xs font-bold uppercase tracking-wide text-chigui-brown">
            <th className="px-2 py-1">Aa</th>
            <th className="px-2 py-1">{idioma === "ru" ? "Название" : "Nombre"}</th>
            <th className="px-2 py-1">{idioma === "ru" ? "Звук" : "Sonido"}</th>
            <th className="px-2 py-1">{idioma === "ru" ? "Пример" : "Ejemplo"}</th>
            {conNotas && <th className="px-2 py-1">Заметка</th>}
          </tr>
        </thead>
        <tbody>
          {filas.map((letra) => (
            <tr key={letra.mayuscula} className="bg-chigui-cream/60">
              <td className="rounded-l-field px-2 py-1.5 font-bold text-brand-green">
                {letra.mayuscula} {letra.minuscula}
              </td>
              <td className="px-2 py-1.5">{letra.nombre}</td>
              <td className="px-2 py-1.5 font-mono text-chigui-brown-dark">{letra.sonido}</td>
              <td className={`px-2 py-1.5 italic ${!conNotas ? "rounded-r-field" : ""}`}>
                {letra.ejemplo}
              </td>
              {conNotas && (
                <td className="rounded-r-field px-2 py-1.5 text-chigui-brown">
                  {letra.nota ?? "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TablaAbecedario({ idioma }: { idioma: Idioma }) {
  return (
    <div className="flex flex-col gap-4">
      <TablaLetras filas={VOCALES} idioma={idioma} encabezado={idioma === "ru" ? "Гласные" : "Vocales"} />
      <TablaLetras
        filas={CONSONANTES}
        idioma={idioma}
        encabezado={idioma === "ru" ? "Согласные" : "Consonantes"}
      />
    </div>
  );
}
