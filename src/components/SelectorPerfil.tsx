import Link from "next/link";
import type { PerfilAlumno } from "@/types/content";

export const PERFILES: { valor: PerfilAlumno; etiqueta: string }[] = [
  { valor: "ninos", etiqueta: "Niños" },
  { valor: "trabajo_viajes", etiqueta: "Trabajo / Viajes" },
];

export default function SelectorPerfil({ perfilActivo }: { perfilActivo: PerfilAlumno }) {
  return (
    <div className="mb-6 inline-flex rounded-full bg-white p-1 shadow-soft">
      {PERFILES.map((p) => (
        <Link
          key={p.valor}
          href={`?perfil=${p.valor}`}
          aria-current={perfilActivo === p.valor ? "true" : undefined}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            perfilActivo === p.valor
              ? "bg-brand-green text-white"
              : "text-chigui-brown hover:text-chigui-brown-dark"
          }`}
        >
          {p.etiqueta}
        </Link>
      ))}
    </div>
  );
}
