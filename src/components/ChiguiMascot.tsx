import Image from "next/image";

// Chigui no es solo un logo: acompaña al alumno y reacciona a lo que pasa
// (saluda, celebra, anima tras un error, duerme en las pantallas vacías).
//
// Estado de los assets: solo "durmiendo" llegó como PNG con transparencia.
// El resto todavía apunta al JPEG original; en cuanto lleguen los PNG recortados
// basta con añadir el archivo a /public/mascota y mapearlo aquí.
export type PoseChigui =
  | "saludando"
  | "celebrando"
  | "aprobando"
  | "animando"
  | "durmiendo"
  | "bloqueado";

const ARCHIVOS: Record<PoseChigui, string> = {
  saludando: "/mascota/chigui.jpeg",
  celebrando: "/mascota/chigui.jpeg",
  aprobando: "/mascota/chigui.jpeg",
  animando: "/mascota/chigui.jpeg",
  durmiendo: "/mascota/durmiendo.png",
  bloqueado: "/mascota/chigui.jpeg",
};

const DESCRIPCIONES: Record<PoseChigui, string> = {
  saludando: "Chigui te saluda",
  celebrando: "Chigui celebra",
  aprobando: "Chigui te felicita",
  animando: "Chigui te anima a intentarlo de nuevo",
  durmiendo: "Chigui duerme: aquí todavía no hay nada",
  bloqueado: "Chigui junto a contenido bloqueado",
};

export default function ChiguiMascot({
  className = "",
  pose = "saludando",
  decorativo = false,
}: {
  className?: string;
  pose?: PoseChigui;
  decorativo?: boolean;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src={ARCHIVOS[pose]}
        alt={decorativo ? "" : DESCRIPCIONES[pose]}
        aria-hidden={decorativo || undefined}
        fill
        sizes="200px"
        className="object-contain"
        priority={pose === "saludando"}
      />
    </span>
  );
}
