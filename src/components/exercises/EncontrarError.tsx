"use client";

import { useState } from "react";
import type { EjercicioContenido } from "@/types/content";
import Boton from "@/components/ui/Boton";
import Texto from "@/components/ui/Texto";
import { ui } from "@/lib/i18n/diccionario";
import { textoConRespaldo } from "@/lib/i18n/contenido";
import { useIdioma } from "@/lib/i18n/context";

export default function EncontrarError({
  contenido,
  deshabilitado,
  onResponder,
}: {
  contenido: Extract<EjercicioContenido, { tipo: "encontrar_error" }>;
  deshabilitado: boolean;
  onResponder: (respuesta: string) => void;
}) {
  const { idioma } = useIdioma();
  const [elegida, setElegida] = useState<string | null>(null);
  const texto = textoConRespaldo(contenido.texto, contenido.texto_ru, idioma);
  const palabras = texto.split(/(\s+)/); // conserva espacios

  return (
    <div>
      <p className="mb-1 text-lg font-bold">{ui.encuentraElError[idioma]}</p>
      <p className="mb-4 text-sm text-chigui-brown">{ui.tocaLaPalabraIncorrecta[idioma]}</p>

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
        <Texto clave="comprobar" />
      </Boton>
    </div>
  );
}
