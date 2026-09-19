"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui } from "@/lib/i18n/diccionario";

export default function EncontrarError({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "encontrar_error" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: string) => void;
}) {
  const [elegida, setElegida] = useState<string | null>(null);
  const palabras = contenido.texto.split(/(\s+)/); // conserva espacios

  return (
    <div>
      <p className="mb-1 text-lg font-bold">
        {ui.encuentraElError.es}{" "}
        <span className="font-normal opacity-60">({ui.encuentraElError.ru})</span>
      </p>
      <p className="mb-4 text-sm text-chigui-brown">
        {ui.tocaLaPalabraIncorrecta.es}
        <br />
        <span className="opacity-70">{ui.tocaLaPalabraIncorrecta.ru}</span>
      </p>

      <p className="mb-2 flex flex-wrap items-center rounded-field bg-chigui-cream p-4 text-lg font-semibold">
        {palabras.map((palabra, i) => {
          if (palabra.trim() === "") return <span key={i}>{palabra}</span>;
          const limpia = palabra.replace(/[.,!?]/g, "");
          return (
            <button
              key={i}
              type="button"
              disabled={deshabilitado}
              aria-pressed={elegida === limpia}
              onClick={() => setElegida(limpia)}
              className={`rounded-lg px-1.5 py-0.5 transition disabled:cursor-not-allowed ${
                elegida === limpia
                  ? "bg-brand-green text-white"
                  : "hover:bg-chigui-tan/40"
              }`}
            >
              {palabra}
            </button>
          );
        })}
      </p>

      <Boton
        className="mt-2"
        disabled={elegida === null || deshabilitado}
        onClick={() => elegida !== null && onResponder(elegida)}
      >
        <TextoBilingue clave="comprobar" modo="en_linea" />
      </Boton>
    </div>
  );
}
