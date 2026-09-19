"use client";

import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import { reportarErrorEjercicio } from "@/lib/reportes";

export default function ReportarError({ ejercicioId }: { ejercicioId: string }) {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "enviado" | "sin_sesion">("idle");

  if (estado === "enviado") {
    return (
      <p className="mt-3 text-xs font-semibold text-brand-green">
        Gracias, revisaremos este ejercicio.
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
        Reportar un error
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
    <div className="mt-2 rounded-xl2 border-2 border-dashed border-chigui-tan bg-chigui-cream p-3">
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Describe el error que encontraste..."
        rows={2}
        className="w-full rounded-lg border-2 border-chigui-tan px-2 py-1 text-sm focus:border-brand-green focus:outline-none"
      />
      {estado === "sin_sesion" && (
        <p className="mt-1 text-xs text-red-700">Inicia sesión para poder reportar un error.</p>
      )}
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={enviar}
          disabled={estado === "enviando" || !mensaje.trim()}
          className="rounded-full bg-brand-red px-4 py-1 text-xs font-bold text-white disabled:opacity-40"
        >
          Enviar reporte
        </button>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          className="rounded-full border-2 border-chigui-tan px-4 py-1 text-xs font-semibold text-chigui-brown"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
