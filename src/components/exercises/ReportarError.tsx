"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { reportarErrorEjercicio } from "@/lib/reportes";
import { ui } from "@/lib/i18n/diccionario";
import { useIdioma } from "@/lib/i18n/context";
import Texto from "@/components/ui/Texto";

export default function ReportarError({ ejercicioId }: { ejercicioId: string }) {
  const { idioma } = useIdioma();
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "enviado" | "sin_sesion">("idle");

  if (estado === "enviado") {
    return (
      <p className="mt-3 text-xs font-semibold text-brand-green">
        {ui.graciasRevisaremos[idioma]}
      </p>
    );
  }

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-chigui-brown transition hover:text-brand-red"
      >
        <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
        <Texto clave="reportarError" />
      </button>
    );
  }

  const enviar = async () => {
    if (!mensaje.trim()) return;
    setEstado("enviando");
    const resultado = await reportarErrorEjercicio(ejercicioId, mensaje.trim());
    if (!resultado.guardado) {
      setEstado("sin_sesion");
    } else {
      setEstado("enviado");
    }
  };

  return (
    <div className="mt-2 rounded-field bg-chigui-cream p-3">
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder={ui.describeElError[idioma]}
        rows={2}
        className="w-full rounded-field bg-white px-2 py-1.5 text-sm"
      />
      {estado === "sin_sesion" && (
        <p className="mt-1 text-xs text-brand-red">
          {ui.iniciaSesionParaReportar[idioma]}
        </p>
      )}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={enviar}
          disabled={estado === "enviando" || !mensaje.trim()}
          className="rounded-full bg-brand-red px-4 py-1.5 text-xs font-bold text-white disabled:opacity-40"
        >
          <Texto clave="enviarReporte" />
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-chigui-brown shadow-soft"
        >
          <Texto clave="cancelar" />
        </button>
      </div>
    </div>
  );
}
