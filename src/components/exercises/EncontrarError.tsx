"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";

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
      <p className="mb-1 text-lg font-bold">Encuentra el error</p>
      <p className="mb-4 text-sm text-chigui-brown">
        Toca la palabra que está incorrecta en la frase.
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
        Comprobar
      </Boton>
    </div>
  );
}
