"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { reportarErrorEjercicio } from "@/lib/reportes";
import { ui } from "@/lib/i18n/diccionario";
import TextoBilingue from "@/components/ui/TextoBilingue";

export default function ReportarError({ ejercicioId }: { ejercicioId: string }) {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "enviado" | "sin_sesion">("idle");

  if (estado === "enviado") {
    return (
      <p className="mt-3 text-xs font-semibold text-brand-green">
        {ui.graciasRevisaremos.es}{" "}
        <span className="font-normal opacity-70">({ui.graciasRevisaremos.ru})</span>
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
        <TextoBilingue clave="reportarError" modo="en_linea" />
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
        placeholder={ui.describeElError.es}
        rows={2}
        className="w-full rounded-field bg-white px-2 py-1.5 text-sm"
      />
      {estado === "sin_sesion" && (
        <p className="mt-1 text-xs text-brand-red">
          {ui.iniciaSesionParaReportar.es}
          <br />
          <span className="opacity-70">{ui.iniciaSesionParaReportar.ru}</span>
        </p>
      )}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={enviar}
          disabled={estado === "enviando" || !mensaje.trim()}
          className="rounded-full bg-brand-red px-4 py-1.5 text-xs font-bold text-white disabled:opacity-40"
        >
          <TextoBilingue clave="enviarReporte" modo="en_linea" />
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-chigui-brown shadow-soft"
        >
          <TextoBilingue clave="cancelar" modo="en_linea" />
        </button>
      </div>
    </div>
  );
}
