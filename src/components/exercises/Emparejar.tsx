"use client";

import { useMemo, useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui } from "@/lib/i18n/diccionario";

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
  const [izquierdaActiva, setIzquierdaActiva] = useState<string | null>(null);

  // Sin desordenar, la opción correcta de la fila N era siempre la opción N de
  // la lista, así que el ejercicio se resolvía sin saber la respuesta.
  const opcionesDerecha = useMemo(
    () => contenido.pares.map((p) => p.derecha).sort((a, b) => hashTexto(a) - hashTexto(b)),
    [contenido]
  );

  const usadas = new Set(Object.values(elegidos));
  const completo = contenido.pares.every((p) => elegidos[p.izquierda]);

  const tocarIzquierda = (izq: string) => {
    if (deshabilitado) return;
    // Si ya tenía pareja, la suelta para poder corregir.
    if (elegidos[izq]) {
      setElegidos((prev) => {
        const copia = { ...prev };
        delete copia[izq];
        return copia;
      });
    }
    setIzquierdaActiva(izq);
  };

  const tocarDerecha = (der: string) => {
    if (deshabilitado || !izquierdaActiva) return;
    if (usadas.has(der)) return;
    setElegidos((prev) => ({ ...prev, [izquierdaActiva]: der }));
    setIzquierdaActiva(null);
  };

  return (
    <div>
      <p className="mb-1 text-lg font-bold">
        {ui.empareja.es} <span className="font-normal opacity-60">({ui.empareja.ru})</span>
      </p>
      <p className="mb-4 text-sm text-chigui-brown">
        {ui.tocaIzquierdaLuegoDerecha.es}
        <br />
        <span className="opacity-70">{ui.tocaIzquierdaLuegoDerecha.ru}</span>
      </p>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {contenido.pares.map((p) => {
            const asignada = elegidos[p.izquierda];
            const activa = izquierdaActiva === p.izquierda;
            return (
              <button
                key={p.izquierda}
                type="button"
                disabled={deshabilitado}
                onClick={() => tocarIzquierda(p.izquierda)}
                className={`rounded-field p-3 text-left font-semibold transition active:scale-[.99] disabled:cursor-not-allowed ${
                  activa
                    ? "bg-brand-green text-white"
                    : asignada
                      ? "bg-brand-green/15 text-chigui-brown-dark"
                      : "bg-chigui-cream text-chigui-brown-dark hover:bg-chigui-tan/30"
                }`}
              >
                <span className="block">{p.izquierda}</span>
                {asignada && (
                  <span className="mt-0.5 block text-xs font-bold text-brand-green">
                    → {asignada}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {opcionesDerecha.map((der) => {
            const yaUsada = usadas.has(der);
            return (
              <button
                key={der}
                type="button"
                disabled={deshabilitado || yaUsada || !izquierdaActiva}
                onClick={() => tocarDerecha(der)}
                className={`rounded-field p-3 text-left font-semibold transition active:scale-[.99] disabled:cursor-not-allowed ${
                  yaUsada
                    ? "bg-chigui-cream/60 text-chigui-tan line-through"
                    : "bg-chigui-cream text-chigui-brown-dark hover:bg-chigui-tan/30 disabled:opacity-60"
                }`}
              >
                {der}
              </button>
            );
          })}
        </div>
      </div>

      <Boton
        className="mt-4"
        disabled={!completo || deshabilitado}
        onClick={() => onResponder(elegidos)}
      >
        <TextoBilingue clave="comprobar" modo="en_linea" />
      </Boton>
    </div>
  );
}
