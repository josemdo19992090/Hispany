import Link from "next/link";
import type { PerfilAlumno } from "@/types/content";
import { ui } from "@/lib/i18n/diccionario";

export const PERFILES: { valor: PerfilAlumno; clave: "perfilNinos" | "perfilTrabajoViajes" }[] = [
  { valor: "ninos", clave: "perfilNinos" },
  { valor: "trabajo_viajes", clave: "perfilTrabajoViajes" },
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
          {ui[p.clave].es}{" "}
          <span className="font-normal opacity-70">({ui[p.clave].ru})</span>
        </Link>
      ))}
    </div>
  );
}
