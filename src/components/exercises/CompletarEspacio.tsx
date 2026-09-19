"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";

export default function CompletarEspacio({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "completar_espacio" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: string[]) => void;
}) {
  const partes = contenido.texto.split("___");
  const cantidadEspacios = partes.length - 1;
  const [valores, setValores] = useState<string[]>(Array(cantidadEspacios).fill(""));

  const actualizar = (i: number, valor: string) => {
    setValores((prev) => prev.map((v, idx) => (idx === i ? valor : v)));
  };

  return (
    <div>
      <p className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold">
        {partes.map((parte, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>{parte}</span>
            {i < cantidadEspacios && (
              <input
                type="text"
                disabled={deshabilitado}
                value={valores[i]}
                onChange={(e) => actualizar(i, e.target.value)}
                className="w-28 rounded-lg border-2 border-chigui-tan px-2 py-1 text-base font-normal focus:border-brand-green focus:outline-none disabled:bg-chigui-cream"
              />
            )}
          </span>
        ))}
      </p>
      <button
        type="button"
        disabled={deshabilitado || valores.some((v) => v.trim() === "")}
        onClick={() => onResponder(valores)}
        className="mt-4 rounded-full bg-brand-green px-6 py-2 font-bold text-white disabled:opacity-40"
      >
        Comprobar
      </button>
    </div>
  );
}
