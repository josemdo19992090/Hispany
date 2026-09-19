"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";

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
      <p className="mb-4 text-lg font-semibold">{contenido.pregunta}</p>
      <div className="flex flex-col gap-2">
        {contenido.opciones.map((opcion, i) => (
          <button
            key={i}
            type="button"
            disabled={deshabilitado}
            onClick={() => setElegida(i)}
            className={`rounded-xl2 border-2 p-3 text-left font-medium transition ${
              elegida === i
                ? "border-brand-green bg-brand-green/10"
                : "border-chigui-tan bg-white hover:border-brand-green"
            } disabled:cursor-not-allowed`}
          >
            {opcion}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={elegida === null || deshabilitado}
        onClick={() => elegida !== null && onResponder(elegida)}
        className="mt-4 rounded-full bg-brand-green px-6 py-2 font-bold text-white disabled:opacity-40"
      >
        Comprobar
      </button>
    </div>
  );
}
