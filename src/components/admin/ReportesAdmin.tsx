"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { Ejercicio, ReporteEjercicio } from "@/types/content";

type ReporteConEjercicio = ReporteEjercicio & {
  ejercicios: Pick<Ejercicio, "tipo" | "contenido"> | null;
};

const ETIQUETA_ESTADO: Record<ReporteEjercicio["estado"], string> = {
  abierto: "Abierto",
  revisado: "Revisado",
  descartado: "Descartado",
};

export default function ReportesAdmin({
  reportesIniciales,
}: {
  reportesIniciales: ReporteConEjercicio[];
}) {
  const [reportes, setReportes] = useState(reportesIniciales);

  const cambiarEstado = async (id: string, estado: ReporteEjercicio["estado"]) => {
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.from("reportes_ejercicio").update({ estado }).eq("id", id);
    setReportes((prev) => prev.map((r) => (r.id === id ? { ...r, estado } : r)));
  };

  if (reportes.length === 0) {
    return (
      <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
        No hay reportes todavía.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reportes.map((r) => (
        <div key={r.id} className="rounded-xl2 border-2 border-chigui-tan bg-white p-4">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-chigui-tan px-2 py-0.5 font-bold text-white">
              {r.ejercicios?.tipo.replaceAll("_", " ") ?? "ejercicio eliminado"}
            </span>
            <span className="text-chigui-brown">
              {new Date(r.created_at).toLocaleString("es-VE")}
            </span>
            <span
              className={`ml-auto rounded-full px-2 py-0.5 font-bold text-white ${
                r.estado === "abierto"
                  ? "bg-brand-red"
                  : r.estado === "revisado"
                    ? "bg-brand-green"
                    : "bg-chigui-brown"
              }`}
            >
              {ETIQUETA_ESTADO[r.estado]}
            </span>
          </div>
          <p className="mb-2 text-sm">{r.mensaje}</p>
          {r.ejercicios && (
            <pre className="mb-2 overflow-x-auto rounded-lg bg-chigui-cream p-2 text-xs">
              {JSON.stringify(r.ejercicios.contenido, null, 2)}
            </pre>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => cambiarEstado(r.id, "revisado")}
              className="rounded-full bg-brand-green px-3 py-1 text-xs font-bold text-white"
            >
              Marcar revisado
            </button>
            <button
              type="button"
              onClick={() => cambiarEstado(r.id, "descartado")}
              className="rounded-full border-2 border-chigui-tan px-3 py-1 text-xs font-bold text-chigui-brown"
            >
              Descartar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
