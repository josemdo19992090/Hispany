"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";
import Texto from "@/components/ui/Texto";
import { ui } from "@/lib/i18n/diccionario";
import { textoConRespaldo } from "@/lib/i18n/contenido";
import { useIdioma } from "@/lib/i18n/context";

export default function VerdaderoFalso({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "verdadero_falso" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: boolean) => void;
}) {
  const { idioma } = useIdioma();
  const [elegido, setElegido] = useState<boolean | null>(null);

  return (
    <div>
      <p className="mb-4 text-lg font-bold">
        {textoConRespaldo(contenido.afirmacion, contenido.afirmacion_ru, idioma)}
      </p>
      <div className="flex gap-3">
        {[true, false].map((valor) => (
          <button
            key={String(valor)}
            type="button"
            disabled={deshabilitado}
            aria-pressed={elegido === valor}
            onClick={() => setElegido(valor)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-field p-4 font-bold transition active:scale-[.99] disabled:cursor-not-allowed ${
              elegido === valor
                ? "bg-brand-green text-white"
                : "bg-chigui-cream text-chigui-brown-dark hover:bg-chigui-tan/30"
            }`}
          >
            {valor ? (
              <Check className="h-5 w-5" aria-hidden="true" />
            ) : (
              <X className="h-5 w-5" aria-hidden="true" />
            )}
            {valor ? ui.verdadero[idioma] : ui.falso[idioma]}
          </button>
        ))}
      </div>
      <Boton
        className="mt-4"
        disabled={elegido === null || deshabilitado}
        onClick={() => elegido !== null && onResponder(elegido)}
      >
        <Texto clave="comprobar" />
      </Boton>
    </div>
  );
}
