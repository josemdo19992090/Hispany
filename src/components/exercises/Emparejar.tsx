"use client";

import { useMemo, useState } from "react";
import type { EjercicioContenido } from "@/types/content";

// Hash simple y estable de una cadena. Se usa para desordenar las opciones de
// forma determinista: si usáramos Math.random() el orden cambiaría en cada
// render (y no coincidiría entre servidor y cliente al hidratar).
function hashTexto(texto: string): number {
  let h = 0;
  for (let i = 0; i < texto.length; i++) {
    h = (h * 31 + texto.charCodeAt(i)) | 0;
  }
  return h;
}

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

  // Sin desordenar, la opción correcta de la fila N era siempre la opción N de
  // la lista, así que el ejercicio se resolvía sin saber la respuesta.
  const opcionesDerecha = useMemo(
    () =>
      contenido.pares
        .map((p) => p.derecha)
        .sort((a, b) => hashTexto(a) - hashTexto(b)),
    [contenido]
  );

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
