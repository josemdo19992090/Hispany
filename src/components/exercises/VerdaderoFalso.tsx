"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";

export default function VerdaderoFalso({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "verdadero_falso" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: boolean) => void;
}) {
  const [elegido, setElegido] = useState<boolean | null>(null);

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">{contenido.afirmacion}</p>
      <div className="flex gap-3">
        {[true, false].map((valor) => (
          <button
            key={String(valor)}
            type="button"
            disabled={deshabilitado}
            onClick={() => setElegido(valor)}
            className={`flex-1 rounded-xl2 border-2 p-3 font-bold transition ${
              elegido === valor
                ? "border-brand-green bg-brand-green/10"
                : "border-chigui-tan bg-white hover:border-brand-green"
            } disabled:cursor-not-allowed`}
          >
            {valor ? "Verdadero" : "Falso"}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={elegido === null || deshabilitado}
        onClick={() => elegido !== null && onResponder(elegido)}
        className="mt-4 rounded-full bg-brand-green px-6 py-2 font-bold text-white disabled:opacity-40"
      >
        Comprobar
      </button>
    </div>
  );
}
