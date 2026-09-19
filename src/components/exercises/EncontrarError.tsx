"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";

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
      <p className="mb-2 text-sm text-chigui-brown">
        Toca la palabra que está incorrecta en la frase.
      </p>
      <p className="mb-4 flex flex-wrap text-lg font-semibold">
        {palabras.map((palabra, i) => {
          if (palabra.trim() === "") return <span key={i}>{palabra}</span>;
          const limpia = palabra.replace(/[.,!?]/g, "");
          return (
            <button
              key={i}
              type="button"
              disabled={deshabilitado}
              onClick={() => setElegida(limpia)}
              className={`rounded px-0.5 transition ${
                elegida === limpia
                  ? "bg-brand-green/20 underline decoration-brand-green decoration-2"
                  : "hover:bg-chigui-tan/30"
              } disabled:cursor-not-allowed`}
            >
              {palabra}
            </button>
          );
        })}
      </p>
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
