"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui } from "@/lib/i18n/diccionario";

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
      <p className="mb-4 text-lg font-bold">
        {ui.ordenaLasPalabras.es}{" "}
        <span className="font-normal opacity-60">({ui.ordenaLasPalabras.ru})</span>
      </p>

      <div className="mb-4 flex min-h-[4rem] flex-wrap content-start gap-2 rounded-field bg-chigui-cream p-3">
        {orden.length === 0 && (
          <span className="text-sm text-chigui-brown">{ui.tocaEnOrden.es}</span>
        )}
        {orden.map((i, posicion) => (
          <button
            key={posicion}
            type="button"
            disabled={deshabilitado}
            onClick={() => quitar(posicion)}
            className="rounded-full bg-brand-green px-4 py-2 font-bold text-white transition active:scale-95 disabled:cursor-not-allowed"
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
            className="rounded-full bg-white px-4 py-2 font-bold text-chigui-brown-dark shadow-soft transition hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed"
          >
            {palabra}
          </button>
        ))}
      </div>

      <Boton
        className="mt-4"
        disabled={orden.length !== contenido.palabras.length || deshabilitado}
        onClick={() => onResponder(orden)}
      >
        <TextoBilingue clave="comprobar" modo="en_linea" />
      </Boton>
    </div>
  );
}
