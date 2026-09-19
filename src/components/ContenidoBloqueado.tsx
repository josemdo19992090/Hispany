import { Lock } from "lucide-react";
import { ui, type ClaveUI } from "@/lib/i18n/diccionario";

export default function ContenidoBloqueado({ mensajeClave }: { mensajeClave: ClaveUI }) {
  const mensaje = ui[mensajeClave];

  return (
    <div className="rounded-card bg-white p-6 text-center shadow-soft">
      <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow/20 text-chigui-brown-dark">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mb-1 font-bold">
        {ui.contenidoPremium.es}{" "}
        <span className="font-normal opacity-60">({ui.contenidoPremium.ru})</span>
      </p>
      <p className="mx-auto max-w-sm text-sm text-chigui-brown">
        {mensaje.es}
        <br />
        <span className="opacity-70">{mensaje.ru}</span>
      </p>
    </div>
  );
}
