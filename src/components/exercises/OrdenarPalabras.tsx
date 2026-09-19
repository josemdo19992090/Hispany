"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";

export default function OrdenarPalabras({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "ordenar_palabras" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: number[]) => void;
}) {
  const [orden, setOrden] = useState<number[]>([]);

  const disponibles = contenido.palabras
    .map((palabra, i) => ({ palabra, i }))
    .filter(({ i }) => !orden.includes(i));

  const agregar = (i: number) => setOrden((prev) => [...prev, i]);
  const quitar = (posicion: number) =>
    setOrden((prev) => prev.filter((_, idx) => idx !== posicion));

  return (
    <div>
      <p className="mb-4 text-lg font-semibold">Ordena las palabras para formar la frase.</p>

      <div className="mb-4 flex min-h-[3rem] flex-wrap gap-2 rounded-xl2 border-2 border-dashed border-chigui-tan p-3">
        {orden.length === 0 && (
          <span className="text-sm text-chigui-brown">Toca las palabras en orden...</span>
        )}
        {orden.map((i, posicion) => (
          <button
            key={posicion}
            type="button"
            disabled={deshabilitado}
            onClick={() => quitar(posicion)}
            className="rounded-lg bg-brand-green px-3 py-1.5 font-semibold text-white"
          >
            {contenido.palabras[i]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {disponibles.map(({ palabra, i }) => (
          <button
            key={i}
            type="button"
            disabled={deshabilitado}
            onClick={() => agregar(i)}
            className="rounded-lg border-2 border-chigui-tan bg-white px-3 py-1.5 font-semibold hover:border-brand-green"
          >
            {palabra}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={orden.length !== contenido.palabras.length || deshabilitado}
        onClick={() => onResponder(orden)}
        className="mt-4 rounded-full bg-brand-green px-6 py-2 font-bold text-white disabled:opacity-40"
      >
        Comprobar
      </button>
    </div>
  );
}
