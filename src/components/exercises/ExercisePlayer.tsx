"use client";

import { useEffect, useState } from "react";
import type { Ejercicio } from "@/types/content";
import {
  ETIQUETA_TIPO_EJERCICIO,
  evaluarEjercicio,
  type RespuestaUsuario,
  type ResultadoEvaluacion,
} from "@/lib/exercises";
import OpcionMultiple from "./OpcionMultiple";
import CompletarEspacio from "./CompletarEspacio";
import Emparejar from "./Emparejar";
import OrdenarPalabras from "./OrdenarPalabras";
import VerdaderoFalso from "./VerdaderoFalso";
import EncontrarError from "./EncontrarError";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
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

    return (
      <div className="rounded-xl2 border-2 border-chigui-tan bg-white p-5">
        <h3 className="text-xl font-extrabold">
          {porcentaje >= 60 ? "¡Bien hecho! 🎉" : "Sigue practicando 💪"}
        </h3>
        <p className="mt-1 text-chigui-brown">
          Respondiste correctamente {correctas} de {total} ({porcentaje}%).
        </p>

        {errores.length > 0 && mostrarErroresDetallados && (
          <div className="mt-4">
            <p className="mb-2 font-bold">Revisa tus errores:</p>
            <ul className="flex flex-col gap-2">
              {errores.map((e, i) => (
                <li key={i} className="rounded-xl2 bg-chigui-cream p-3 text-sm">
                  <p className="font-semibold">{ETIQUETA_TIPO_EJERCICIO[e.ejercicio.tipo]}</p>
                  <p className="text-red-700">Tu respuesta: {e.respuestaDadaTexto}</p>
                  <p className="text-brand-green">
                    Respuesta correcta: {e.respuestaCorrectaTexto}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {errores.length > 0 && !mostrarErroresDetallados && (
          <div className="mt-4">
            <ContenidoBloqueado mensaje="El detalle de tus errores con las respuestas correctas es una función premium." />
          </div>
        )}

        <button
          type="button"
          onClick={reiniciar}
          className="mt-5 rounded-full bg-brand-green px-6 py-2 font-bold text-white"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl2 border-2 border-chigui-tan bg-white p-5">
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between text-xs font-semibold text-chigui-brown">
          <span>
            Pregunta {indice + 1} de {ejercicios.length}
          </span>
          <span>{ETIQUETA_TIPO_EJERCICIO[ejercicioActual.tipo]}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-chigui-cream">
          <div
            className="h-full rounded-full bg-brand-green transition-all"
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
          className={`mt-4 rounded-xl2 p-3 ${
            resultadoActual.correcta ? "bg-brand-green/10" : "bg-red-100"
          }`}
        >
          <p
            className={`font-bold ${
              resultadoActual.correcta ? "text-brand-green" : "text-red-700"
            }`}
          >
            {resultadoActual.correcta ? "¡Correcto! ✅" : "Incorrecto ❌"}
          </p>
          {!resultadoActual.correcta && (
            <p className="text-sm text-chigui-brown-dark">
              Respuesta correcta: {resultadoActual.respuestaCorrectaTexto}
            </p>
          )}
          <button
            type="button"
            onClick={siguiente}
            className="mt-3 rounded-full bg-brand-green px-6 py-2 font-bold text-white"
          >
            {indice + 1 < ejercicios.length ? "Siguiente" : "Ver resumen"}
          </button>
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
