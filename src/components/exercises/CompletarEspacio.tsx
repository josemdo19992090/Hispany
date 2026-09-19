"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";

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
      <p className="mb-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-lg font-bold">
        {partes.map((parte, i) => (
          <span key={i} className="flex items-center gap-1">
            <span>{parte}</span>
            {i < cantidadEspacios && (
              <input
                type="text"
                disabled={deshabilitado}
                value={valores[i]}
                onChange={(e) => actualizar(i, e.target.value)}
                aria-label={`Espacio ${i + 1}`}
                autoComplete="off"
                className="w-32 rounded-field bg-chigui-cream px-3 py-1.5 text-base font-semibold text-chigui-brown-dark placeholder:text-chigui-tan disabled:opacity-70"
                placeholder="..."
              />
            )}
          </span>
        ))}
      </p>
      <Boton
        className="mt-2"
        disabled={deshabilitado || valores.some((v) => v.trim() === "")}
        onClick={() => onResponder(valores)}
      >
        Comprobar
      </Boton>
    </div>
  );
}
