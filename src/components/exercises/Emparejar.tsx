"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";

export default function Emparejar({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "emparejar" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: Record<string, string>) => void;
}) {
  const [elegidos, setElegidos] = useState<Record<string, string>>({});
  const opcionesDerecha = contenido.pares.map((p) => p.derecha);

  const elegir = (izquierda: string, derecha: string) => {
    setElegidos((prev) => ({ ...prev, [izquierda]: derecha }));
  };

  const completo = contenido.pares.every((p) => elegidos[p.izquierda]);

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">Empareja cada elemento con su pareja correcta.</p>
      <div className="flex flex-col gap-3">
        {contenido.pares.map((p) => (
          <div key={p.izquierda} className="flex items-center gap-3">
            <span className="w-32 shrink-0 font-semibold">{p.izquierda}</span>
            <select
              disabled={deshabilitado}
              value={elegidos[p.izquierda] ?? ""}
              onChange={(e) => elegir(p.izquierda, e.target.value)}
              className="flex-1 rounded-lg border-2 border-chigui-tan px-2 py-1.5 focus:border-brand-green focus:outline-none disabled:bg-chigui-cream"
            >
              <option value="" disabled>
                Elige...
              </option>
              {opcionesDerecha.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={!completo || deshabilitado}
        onClick={() => onResponder(elegidos)}
        className="mt-4 rounded-full bg-brand-green px-6 py-2 font-bold text-white disabled:opacity-40"
      >
        Comprobar
      </button>
    </div>
  );
}
