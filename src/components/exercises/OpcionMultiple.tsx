"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";
import TextoBilingue from "@/components/ui/TextoBilingue";

export default function OpcionMultiple({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "opcion_multiple" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: number) => void;
}) {
  const [elegida, setElegida] = useState<number | null>(null);

  return (
    <div>
      <p className="mb-4 text-lg font-bold">{contenido.pregunta}</p>
      <div className="flex flex-col gap-2">
        {contenido.opciones.map((opcion, i) => (
          <button
            key={i}
            type="button"
            disabled={deshabilitado}
            aria-pressed={elegida === i}
            onClick={() => setElegida(i)}
            className={`rounded-field p-4 text-left font-semibold transition active:scale-[.99] disabled:cursor-not-allowed ${
              elegida === i
                ? "bg-brand-green text-white"
                : "bg-chigui-cream text-chigui-brown-dark hover:bg-chigui-tan/30"
            }`}
          >
            {opcion}
          </button>
        ))}
      </div>
      <Boton
        className="mt-4"
        disabled={elegida === null || deshabilitado}
        onClick={() => elegida !== null && onResponder(elegida)}
      >
        <TextoBilingue clave="comprobar" modo="en_linea" />
      </Boton>
    </div>
  );
}
