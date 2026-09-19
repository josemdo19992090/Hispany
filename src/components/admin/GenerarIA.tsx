"use client";

import { useEffect, useMemo, useState } from "react";
import type { Clase, Ejercicio, Nivel, Seccion } from "@/types/content";
import { listarEjercicios } from "@/lib/admin-ejercicios";
import { accionGenerarVariante, accionPublicarVariante } from "@/app/admin/ia/actions";

type TipoContenedor = "clase" | "seccion" | "nivel";

export default function GenerarIA({
  niveles,
  secciones,
  clases,
}: {
  niveles: Nivel[];
  secciones: Seccion[];
  clases: Clase[];
}) {
  const [tipoContenedor, setTipoContenedor] = useState<TipoContenedor>("clase");
  const [nivelId, setNivelId] = useState(niveles[0]?.id ?? "");
  const seccionesDelNivel = useMemo(
    () => secciones.filter((s) => s.nivel_id === nivelId),
    [secciones, nivelId]
  );
  const [seccionId, setSeccionId] = useState(seccionesDelNivel[0]?.id ?? "");
  const clasesDeSeccion = useMemo(
    () => clases.filter((c) => c.seccion_id === seccionId),
    [clases, seccionId]
  );
  const [claseId, setClaseId] = useState(clasesDeSeccion[0]?.id ?? "");

  useEffect(() => {
    setSeccionId(secciones.find((s) => s.nivel_id === nivelId)?.id ?? "");
  }, [nivelId, secciones]);

  useEffect(() => {
    setClaseId(clases.find((c) => c.seccion_id === seccionId)?.id ?? "");
  }, [seccionId, clases]);

  const contenedor =
    tipoContenedor === "clase"
      ? { claseId }
      : tipoContenedor === "seccion"
        ? { seccionId }
        : { nivelId };

  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);

  useEffect(() => {
    listarEjercicios(contenedor).then(setEjercicios);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claseId, seccionId, nivelId, tipoContenedor]);

  const [seleccionado, setSeleccionado] = useState<Ejercicio | null>(null);
  const [generando, setGenerando] = useState(false);
  const [borrador, setBorrador] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [publicando, setPublicando] = useState(false);
  const [publicado, setPublicado] = useState(false);

  const generar = async (ej: Ejercicio) => {
    setSeleccionado(ej);
    setBorrador(null);
    setError(null);
    setPublicado(false);
    setGenerando(true);
    try {
      const { contenido } = await accionGenerarVariante(ej.id);
      setBorrador(JSON.stringify(contenido, null, 2));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setGenerando(false);
  };

  const publicar = async () => {
    if (!seleccionado || !borrador) return;
    setError(null);
    let contenido;
    try {
      contenido = JSON.parse(borrador);
    } catch {
      setError("El JSON editado no es válido.");
      return;
    }
    setPublicando(true);
    try {
      await accionPublicarVariante({ ejercicioBaseId: seleccionado.id, contenido });
      setPublicado(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
    setPublicando(false);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 rounded-xl2 border-2 border-chigui-tan bg-white p-4">
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Contenedor
          <select
            value={tipoContenedor}
            onChange={(e) => setTipoContenedor(e.target.value as TipoContenedor)}
            className="rounded-lg border-2 border-chigui-tan px-2 py-1"
          >
            <option value="clase">Ejercicios de una clase</option>
            <option value="seccion">Prueba de cierre de sección</option>
            <option value="nivel">Prueba final de nivel</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Nivel
          <select
            value={nivelId}
            onChange={(e) => setNivelId(e.target.value)}
            className="rounded-lg border-2 border-chigui-tan px-2 py-1"
          >
            {niveles.map((n) => (
              <option key={n.id} value={n.id}>
                {n.codigo}
              </option>
            ))}
          </select>
        </label>
        {tipoContenedor !== "nivel" && (
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Sección
            <select
              value={seccionId}
              onChange={(e) => setSeccionId(e.target.value)}
              className="rounded-lg border-2 border-chigui-tan px-2 py-1"
            >
              {seccionesDelNivel.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.titulo}
                </option>
              ))}
            </select>
          </label>
        )}
        {tipoContenedor === "clase" && (
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Clase
            <select
              value={claseId}
              onChange={(e) => setClaseId(e.target.value)}
              className="rounded-lg border-2 border-chigui-tan px-2 py-1"
            >
              {clasesDeSeccion.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.titulo}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {ejercicios.map((ej) => (
          <div
            key={ej.id}
            className={`flex items-center gap-3 rounded-xl2 border-2 bg-white p-3 ${
              seleccionado?.id === ej.id ? "border-brand-green" : "border-chigui-tan"
            }`}
          >
            <span className="rounded-full bg-chigui-tan px-2 py-0.5 text-xs font-bold text-white">
              {ej.tipo.replaceAll("_", " ")}
            </span>
            <span className="flex-1 truncate text-sm text-chigui-brown">
              {"pregunta" in ej.contenido
                ? ej.contenido.pregunta
                : "afirmacion" in ej.contenido
                  ? ej.contenido.afirmacion
                  : "texto" in ej.contenido
                    ? ej.contenido.texto
                    : JSON.stringify(ej.contenido).slice(0, 60)}
            </span>
            <button
              type="button"
              onClick={() => generar(ej)}
              disabled={generando}
              className="rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white disabled:opacity-50"
            >
              ✨ Generar variante
            </button>
          </div>
        ))}
        {ejercicios.length === 0 && (
          <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
            Sin ejercicios en este contenedor todavía.
          </p>
        )}
      </div>

      {seleccionado && (
        <div className="mt-6 rounded-xl2 border-2 border-brand-blue bg-white p-4">
          <p className="mb-2 font-bold">
            Variante generada para: {seleccionado.tipo.replaceAll("_", " ")}
          </p>

          {generando && <p className="text-chigui-brown">Generando con Gemini...</p>}

          {error && <p className="mb-2 text-sm text-red-700">{error}</p>}

          {borrador && !publicado && (
            <>
              <p className="mb-1 text-xs text-chigui-brown">
                Revisa y edita antes de publicar (queda marcada como variante IA y premium):
              </p>
              <textarea
                value={borrador}
                onChange={(e) => setBorrador(e.target.value)}
                rows={8}
                className="w-full rounded-lg border-2 border-chigui-tan p-2 font-mono text-xs focus:border-brand-green focus:outline-none"
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={publicar}
                  disabled={publicando}
                  className="rounded-full bg-brand-green px-4 py-1.5 text-sm font-bold text-white disabled:opacity-50"
                >
                  Aprobar y publicar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSeleccionado(null);
                    setBorrador(null);
                  }}
                  className="rounded-full border-2 border-chigui-tan px-4 py-1.5 text-sm font-bold text-chigui-brown"
                >
                  Descartar
                </button>
              </div>
            </>
          )}

          {publicado && (
            <p className="font-semibold text-brand-green">
              ✅ Variante publicada como ejercicio premium.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
