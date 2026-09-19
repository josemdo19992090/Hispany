"use client";

import { useEffect, useMemo, useState } from "react";
import type { Clase, Ejercicio, Nivel, PerfilAlumno, Seccion, TipoEjercicio } from "@/types/content";
import {
  PLANTILLA_CONTENIDO,
  listarEjercicios,
  crearEjercicio,
  actualizarEjercicio,
  borrarEjercicio,
} from "@/lib/admin-ejercicios";

const TIPOS: TipoEjercicio[] = [
  "opcion_multiple",
  "completar_espacio",
  "emparejar",
  "ordenar_palabras",
  "verdadero_falso",
  "encontrar_error",
];

const PERFILES: PerfilAlumno[] = ["ninos", "trabajo_viajes"];

type TipoContenedor = "clase" | "seccion" | "nivel";

export default function EjerciciosAdmin({
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
    const primera = secciones.find((s) => s.nivel_id === nivelId);
    setSeccionId(primera?.id ?? "");
  }, [nivelId, secciones]);

  useEffect(() => {
    const primera = clases.find((c) => c.seccion_id === seccionId);
    setClaseId(primera?.id ?? "");
  }, [seccionId, clases]);

  const contenedor =
    tipoContenedor === "clase"
      ? { claseId }
      : tipoContenedor === "seccion"
        ? { seccionId }
        : { nivelId };

  const contenedorListo =
    (tipoContenedor === "clase" && claseId) ||
    (tipoContenedor === "seccion" && seccionId) ||
    (tipoContenedor === "nivel" && nivelId);

  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [cargando, setCargando] = useState(false);

  const recargar = async () => {
    if (!contenedorListo) {
      setEjercicios([]);
      return;
    }
    setCargando(true);
    const data = await listarEjercicios(contenedor);
    setEjercicios(data);
    setCargando(false);
  };

  useEffect(() => {
    recargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claseId, seccionId, nivelId, tipoContenedor]);

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

      {cargando ? (
        <p className="text-chigui-brown">Cargando...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {ejercicios.map((ej) => (
            <FilaEjercicio key={ej.id} ejercicio={ej} onCambio={recargar} />
          ))}
          {ejercicios.length === 0 && (
            <p className="rounded-xl2 bg-white p-4 text-chigui-brown shadow-sm">
              Sin ejercicios en este contenedor todavía.
            </p>
          )}
        </div>
      )}

      {contenedorListo && (
        <NuevoEjercicio contenedor={contenedor} onCreado={recargar} />
      )}
    </div>
  );
}

function FilaEjercicio({
  ejercicio,
  onCambio,
}: {
  ejercicio: Ejercicio;
  onCambio: () => void;
}) {
  const [contenidoTexto, setContenidoTexto] = useState(
    JSON.stringify(ejercicio.contenido, null, 2)
  );
  const [orden, setOrden] = useState(ejercicio.orden);
  const [isPremium, setIsPremium] = useState(ejercicio.is_premium);
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [confirmandoBorrado, setConfirmandoBorrado] = useState(false);

  const guardar = async () => {
    setError(null);
    let contenido;
    try {
      contenido = JSON.parse(contenidoTexto);
    } catch {
      setError("El contenido no es JSON válido.");
      return;
    }
    setGuardando(true);
    try {
      await actualizarEjercicio(ejercicio.id, { contenido, orden, is_premium: isPremium });
      onCambio();
    } catch (e) {
      setError(String(e));
    }
    setGuardando(false);
  };

  const eliminar = async () => {
    await borrarEjercicio(ejercicio.id);
    onCambio();
  };

  return (
    <div className="rounded-xl2 border-2 border-chigui-tan bg-white p-4">
      <div className="mb-2 flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full bg-brand-green px-2 py-0.5 font-bold text-white">
          {ejercicio.tipo.replaceAll("_", " ")}
        </span>
        <span className="font-semibold text-chigui-brown">{ejercicio.perfil}</span>
        {ejercicio.es_variante_ia && (
          <span className="rounded-full bg-brand-blue px-2 py-0.5 text-xs font-bold text-white">
            ✨ variante IA ({ejercicio.estado_revision_ia})
          </span>
        )}
        <label className="ml-auto flex items-center gap-1 font-semibold">
          Orden
          <input
            type="number"
            value={orden}
            onChange={(e) => setOrden(Number(e.target.value))}
            className="w-14 rounded-lg border-2 border-chigui-tan px-1 py-0.5"
          />
        </label>
        <label className="flex items-center gap-1 font-semibold">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          Premium
        </label>
      </div>

      <textarea
        value={contenidoTexto}
        onChange={(e) => setContenidoTexto(e.target.value)}
        rows={6}
        className="w-full rounded-lg border-2 border-chigui-tan p-2 font-mono text-xs focus:border-brand-green focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={guardar}
          disabled={guardando}
          className="rounded-full bg-brand-green px-4 py-1 text-sm font-bold text-white disabled:opacity-50"
        >
          Guardar
        </button>
        {confirmandoBorrado ? (
          <>
            <button
              type="button"
              onClick={eliminar}
              className="rounded-full bg-brand-red px-4 py-1 text-sm font-bold text-white"
            >
              Sí, borrar
            </button>
            <button
              type="button"
              onClick={() => setConfirmandoBorrado(false)}
              className="rounded-full border-2 border-chigui-tan px-4 py-1 text-sm font-bold text-chigui-brown"
            >
              Cancelar
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmandoBorrado(true)}
            className="rounded-full border-2 border-brand-red px-4 py-1 text-sm font-bold text-brand-red"
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}

function NuevoEjercicio({
  contenedor,
  onCreado,
}: {
  contenedor: { claseId?: string; seccionId?: string; nivelId?: string };
  onCreado: () => void;
}) {
  const [tipo, setTipo] = useState<TipoEjercicio>("opcion_multiple");
  const [perfil, setPerfil] = useState<PerfilAlumno>("ninos");
  const [orden, setOrden] = useState(1);
  const [isPremium, setIsPremium] = useState(true);
  const [contenidoTexto, setContenidoTexto] = useState(
    JSON.stringify(PLANTILLA_CONTENIDO.opcion_multiple, null, 2)
  );
  const [error, setError] = useState<string | null>(null);
  const [creando, setCreando] = useState(false);

  const cambiarTipo = (nuevo: TipoEjercicio) => {
    setTipo(nuevo);
    setContenidoTexto(JSON.stringify(PLANTILLA_CONTENIDO[nuevo], null, 2));
  };

  const crear = async () => {
    setError(null);
    let contenido;
    try {
      contenido = JSON.parse(contenidoTexto);
    } catch {
      setError("El contenido no es JSON válido.");
      return;
    }
    setCreando(true);
    try {
      await crearEjercicio({ contenedor, perfil, tipo, orden, contenido, is_premium: isPremium });
      setContenidoTexto(JSON.stringify(PLANTILLA_CONTENIDO[tipo], null, 2));
      onCreado();
    } catch (e) {
      setError(String(e));
    }
    setCreando(false);
  };

  return (
    <div className="mt-4 rounded-xl2 border-2 border-dashed border-chigui-tan bg-white p-4">
      <p className="mb-3 font-bold">+ Nuevo ejercicio</p>
      <div className="mb-3 flex flex-wrap gap-3 text-sm">
        <label className="flex flex-col gap-1 font-semibold">
          Tipo
          <select
            value={tipo}
            onChange={(e) => cambiarTipo(e.target.value as TipoEjercicio)}
            className="rounded-lg border-2 border-chigui-tan px-2 py-1"
          >
            {TIPOS.map((t) => (
              <option key={t} value={t}>
                {t.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Perfil
          <select
            value={perfil}
            onChange={(e) => setPerfil(e.target.value as PerfilAlumno)}
            className="rounded-lg border-2 border-chigui-tan px-2 py-1"
          >
            {PERFILES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 font-semibold">
          Orden
          <input
            type="number"
            value={orden}
            onChange={(e) => setOrden(Number(e.target.value))}
            className="w-16 rounded-lg border-2 border-chigui-tan px-2 py-1"
          />
        </label>
        <label className="flex items-end gap-1 pb-1 font-semibold">
          <input
            type="checkbox"
            checked={isPremium}
            onChange={(e) => setIsPremium(e.target.checked)}
          />
          Premium
        </label>
      </div>

      <textarea
        value={contenidoTexto}
        onChange={(e) => setContenidoTexto(e.target.value)}
        rows={6}
        className="w-full rounded-lg border-2 border-chigui-tan p-2 font-mono text-xs focus:border-brand-green focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}

      <button
        type="button"
        onClick={crear}
        disabled={creando}
        className="mt-2 rounded-full bg-brand-green px-4 py-1.5 text-sm font-bold text-white disabled:opacity-50"
      >
        Crear ejercicio
      </button>
    </div>
  );
}
