"use client";

import { useEffect, useState } from "react";
import type { Ejercicio } from "@/types/content";
import {
  evaluarEjercicio,
  type RespuestaUsuario,
  type ResultadoEvaluacion,
} from "@/lib/exercises";
import { ui, etiquetaTipoEjercicio } from "@/lib/i18n/diccionario";
import TextoBilingue from "@/components/ui/TextoBilingue";
import OpcionMultiple from "./OpcionMultiple";
import CompletarEspacio from "./CompletarEspacio";
import Emparejar from "./Emparejar";
import OrdenarPalabras from "./OrdenarPalabras";
import VerdaderoFalso from "./VerdaderoFalso";
import EncontrarError from "./EncontrarError";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import ChiguiMascot from "@/components/ChiguiMascot";
import Boton from "@/components/ui/Boton";
import ReportarError from "./ReportarError";

interface RespuestaRegistrada extends ResultadoEvaluacion {
  ejercicio: Ejercicio;
}

interface ResumenFinal {
  correctas: number;
  total: number;
  porcentaje: number;
}

export default function ExercisePlayer({
  ejercicios,
  onTerminar,
  mostrarErroresDetallados = true,
}: {
  ejercicios: Ejercicio[];
  onTerminar?: (resumen: ResumenFinal) => void;
  mostrarErroresDetallados?: boolean;
}) {
  const [indice, setIndice] = useState(0);
  const [resultadoActual, setResultadoActual] = useState<ResultadoEvaluacion | null>(null);
  const [historial, setHistorial] = useState<RespuestaRegistrada[]>([]);
  const [terminado, setTerminado] = useState(false);

  const ejercicioActual = ejercicios[indice];

  const manejarRespuesta = (respuesta: RespuestaUsuario) => {
    const resultado = evaluarEjercicio(ejercicioActual, respuesta);
    setResultadoActual(resultado);
    setHistorial((prev) => [...prev, { ...resultado, ejercicio: ejercicioActual }]);
  };

  const siguiente = () => {
    setResultadoActual(null);
    if (indice + 1 < ejercicios.length) {
      setIndice(indice + 1);
    } else {
      setTerminado(true);
    }
  };

  const reiniciar = () => {
    setIndice(0);
    setResultadoActual(null);
    setHistorial([]);
    setTerminado(false);
  };

  useEffect(() => {
    if (!terminado) return;
    const correctas = historial.filter((h) => h.correcta).length;
    const total = historial.length;
    onTerminar?.({ correctas, total, porcentaje: correctas / total });
    // Solo debe dispararse una vez al llegar al resumen, no en cada re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terminado]);

  if (terminado) {
    const correctas = historial.filter((h) => h.correcta).length;
    const total = historial.length;
    const porcentaje = Math.round((correctas / total) * 100);
    const errores = historial.filter((h) => !h.correcta);

    const aprobado = porcentaje >= 60;

    return (
      <div className="animate-aparecer rounded-card bg-white p-6 shadow-soft">
        <div className="flex flex-col items-center text-center">
          <ChiguiMascot
            className="mb-3 h-24 w-24"
            pose={aprobado ? "celebrando" : "animando"}
          />
          <TextoBilingue
            clave={aprobado ? "bienHecho" : "sigueRracticando"}
            as="h3"
            className="text-xl font-extrabold"
          />
          <p className="mt-1 text-chigui-brown">
            {ui.acertaste.es} {correctas} {ui.de.es} {total}
            <br />
            <span className="text-sm opacity-70">
              {ui.acertaste.ru} {correctas} {ui.de.ru} {total}
            </span>
          </p>

          <div className="mt-4 w-full max-w-xs">
            <div className="h-3 w-full overflow-hidden rounded-full bg-chigui-cream">
              <div
                className={`h-full rounded-full transition-all ${
                  aprobado ? "bg-brand-green" : "bg-brand-yellow"
                }`}
                style={{ width: `${porcentaje}%` }}
              />
            </div>
            <p className="mt-1 text-sm font-bold">{porcentaje}%</p>
          </div>
        </div>

        {errores.length > 0 && mostrarErroresDetallados && (
          <div className="mt-6">
            <TextoBilingue clave="revisaTusErrores" as="p" className="mb-2 font-bold" />
            <ul className="flex flex-col gap-2">
              {errores.map((e, i) => (
                <li key={i} className="rounded-field bg-chigui-cream p-3 text-sm">
                  <p className="mb-1 font-bold">
                    {etiquetaTipoEjercicio[e.ejercicio.tipo].es}{" "}
                    <span className="font-normal opacity-60">
                      ({etiquetaTipoEjercicio[e.ejercicio.tipo].ru})
                    </span>
                  </p>
                  <p className="flex items-start gap-1.5 text-brand-red">
                    <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {e.respuestaDadaTexto}
                  </p>
                  <p className="flex items-start gap-1.5 text-brand-green">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {e.respuestaCorrectaTexto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {errores.length > 0 && !mostrarErroresDetallados && (
          <div className="mt-6">
            <ContenidoBloqueado mensajeClave="mensajeErroresPremium" />
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Boton onClick={reiniciar}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <TextoBilingue clave="reintentar" modo="en_linea" />
          </Boton>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-card bg-white p-5 shadow-soft">
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-bold text-chigui-brown">
          <span>
            {ui.pregunta.es} {indice + 1} {ui.de.es} {ejercicios.length}{" "}
            <span className="font-normal opacity-60">
              ({ui.pregunta.ru} {indice + 1} {ui.de.ru} {ejercicios.length})
            </span>
          </span>
          <span>{etiquetaTipoEjercicio[ejercicioActual.tipo].es}</span>
        </div>
        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-chigui-cream"
          role="progressbar"
          aria-valuenow={historial.length}
          aria-valuemin={0}
          aria-valuemax={ejercicios.length}
        >
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-300"
            style={{ width: `${(historial.length / ejercicios.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Las `key` son obligatorias: sin ellas, al pasar a otra pregunta DEL MISMO
          TIPO React reutiliza el componente y se conserva la opción ya marcada.
          Y tienen que ser DISTINTAS entre sí: dos hermanos con la misma key
          rompen la reconciliación (React insertaba la pregunta nueva al lado de
          la vieja en vez de reemplazarla). */}
      <RenderizadorEjercicio
        key={`ejercicio-${ejercicioActual.id}`}
        ejercicio={ejercicioActual}
        deshabilitado={resultadoActual !== null}
        onResponder={manejarRespuesta}
      />

      <ReportarError
        key={`reporte-${ejercicioActual.id}`}
        ejercicioId={ejercicioActual.id}
      />

      {resultadoActual && (
        <div
          role="status"
          className={`mt-4 rounded-card p-4 ${
            resultadoActual.correcta
              ? "animate-aparecer bg-brand-green/10"
              : "animate-temblor bg-brand-red/10"
          }`}
        >
          <div className="flex items-start gap-3">
            <ChiguiMascot
              className="h-12 w-12 shrink-0"
              pose={resultadoActual.correcta ? "aprobando" : "animando"}
            />
            <div className="min-w-0 flex-1">
              <p
                className={`flex items-center gap-1.5 font-bold ${
                  resultadoActual.correcta ? "text-brand-green" : "text-brand-red"
                }`}
              >
                {resultadoActual.correcta ? (
                  <>
                    <Check className="h-5 w-5" aria-hidden="true" />
                    {ui.correcto.es}{" "}
                    <span className="font-normal opacity-60">({ui.correcto.ru})</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5" aria-hidden="true" />
                    {ui.casi.es}{" "}
                    <span className="font-normal opacity-60">({ui.casi.ru})</span>
                  </>
                )}
              </p>
              {!resultadoActual.correcta && (
                <p className="text-sm text-chigui-brown-dark">
                  {ui.respuestaCorrecta.es}:{" "}
                  <strong>{resultadoActual.respuestaCorrectaTexto}</strong>
                </p>
              )}
            </div>
          </div>

          <div className="mt-3 flex justify-end">
            <Boton onClick={siguiente}>
              <TextoBilingue
                clave={indice + 1 < ejercicios.length ? "siguiente" : "verResumen"}
                modo="en_linea"
              />
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Boton>
          </div>
        </div>
      )}
    </div>
  );
}

function RenderizadorEjercicio({
  ejercicio,
  deshabilitado,
  onResponder,
}: {
  ejercicio: Ejercicio;
  deshabilitado: boolean;
  onResponder: (respuesta: RespuestaUsuario) => void;
}) {
  const c = ejercicio.contenido;
  switch (c.tipo) {
    case "opcion_multiple":
      return (
        <OpcionMultiple contenido={c} deshabilitado={deshabilitado} onResponder={onResponder} />
      );
    case "completar_espacio":
      return (
        <CompletarEspacio
          contenido={c}
          deshabilitado={deshabilitado}
          onResponder={onResponder}
        />
      );
    case "emparejar":
      return <Emparejar contenido={c} deshabilitado={deshabilitado} onResponder={onResponder} />;
    case "ordenar_palabras":
      return (
        <OrdenarPalabras contenido={c} deshabilitado={deshabilitado} onResponder={onResponder} />
      );
    case "verdadero_falso":
      return (
        <VerdaderoFalso contenido={c} deshabilitado={deshabilitado} onResponder={onResponder} />
      );
    case "encontrar_error":
      return (
        <EncontrarError contenido={c} deshabilitado={deshabilitado} onResponder={onResponder} />
      );
  }
}
