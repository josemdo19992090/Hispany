import Link from "next/link";
import type { PerfilAlumno } from "@/types/content";

export const PERFILES: { valor: PerfilAlumno; etiqueta: string }[] = [
  { valor: "ninos", etiqueta: "Niños" },
  { valor: "trabajo_viajes", etiqueta: "Trabajo / Viajes" },
];

export default function SelectorPerfil({ perfilActivo }: { perfilActivo: PerfilAlumno }) {
  return (
    <div className="mb-6 flex gap-2">
      {PERFILES.map((p) => (
        <Link
          key={p.valor}
          href={`?perfil=${p.valor}`}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            perfilActivo === p.valor
              ? "bg-brand-green text-white"
              : "border-2 border-chigui-tan bg-white text-chigui-brown"
          }`}
        >
          {p.etiqueta}
        </Link>
      ))}
    </div>
  );
}
