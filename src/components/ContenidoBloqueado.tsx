import { Lock } from "lucide-react";
import { ui, type ClaveUI } from "@/lib/i18n/diccionario";
import type { Idioma } from "@/lib/i18n/idioma";

export default function ContenidoBloqueado({
  mensajeClave,
  idioma,
}: {
  mensajeClave: ClaveUI;
  idioma: Idioma;
}) {
  const mensaje = ui[mensajeClave][idioma];

  return (
    <div className="rounded-card bg-white p-6 text-center shadow-soft">
      <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow/20 text-chigui-brown-dark">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mb-1 font-bold">{ui.contenidoPremium[idioma]}</p>
      <p className="mx-auto max-w-sm text-sm text-chigui-brown">{mensaje}</p>
    </div>
  );
}
