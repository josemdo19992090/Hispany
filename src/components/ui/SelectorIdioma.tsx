"use client";

import { useIdioma } from "@/lib/i18n/context";

export default function SelectorIdioma() {
  const { idioma, cambiarIdioma } = useIdioma();

  return (
    <div className="flex rounded-full bg-chigui-cream p-0.5 text-xs font-bold">
      <button
        type="button"
        onClick={() => cambiarIdioma("es")}
        aria-pressed={idioma === "es"}
        aria-label="Español"
        className={`rounded-full px-2.5 py-1 transition ${
          idioma === "es" ? "bg-brand-green text-white" : "text-chigui-brown"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => cambiarIdioma("ru")}
        aria-pressed={idioma === "ru"}
        aria-label="Русский"
        className={`rounded-full px-2.5 py-1 transition ${
          idioma === "ru" ? "bg-brand-green text-white" : "text-chigui-brown"
        }`}
      >
        RU
      </button>
    </div>
  );
}
