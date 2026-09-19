import type { Ejercicio } from "@/types/content";

// Forma de la respuesta que da el alumno, según el tipo de ejercicio.
export type RespuestaOpcionMultiple = number; // índice de la opción elegida
export type RespuestaCompletarEspacio = string[]; // una por cada "___" en el texto
export type RespuestaEmparejar = Record<string, string>; // izquierda -> derecha elegida
export type RespuestaOrdenarPalabras = number[]; // índices originales en el orden armado
export type RespuestaVerdaderoFalso = boolean;
export type RespuestaEncontrarError = string; // palabra que el alumno marcó como incorrecta

export type RespuestaUsuario =
  | RespuestaOpcionMultiple
  | RespuestaCompletarEspacio
  | RespuestaEmparejar
  | RespuestaOrdenarPalabras
  | RespuestaVerdaderoFalso
  | RespuestaEncontrarError;

export interface ResultadoEvaluacion {
  correcta: boolean;
  respuestaDadaTexto: string;
  respuestaCorrectaTexto: string;
}

function normalizar(texto: string): string {
  return texto.trim().toLowerCase();
}

export function evaluarEjercicio(
  ejercicio: Ejercicio,
  respuesta: RespuestaUsuario
): ResultadoEvaluacion {
  const c = ejercicio.contenido;

  switch (c.tipo) {
    case "opcion_multiple": {
      const elegida = respuesta as RespuestaOpcionMultiple;
      return {
        correcta: elegida === c.respuesta_correcta,
        respuestaDadaTexto: c.opciones[elegida] ?? "(sin respuesta)",
        respuestaCorrectaTexto: c.opciones[c.respuesta_correcta],
      };
    }

    case "completar_espacio": {
      const dadas = respuesta as RespuestaCompletarEspacio;
      const correcta = c.respuestas.every(
        (r, i) => normalizar(dadas[i] ?? "") === normalizar(r)
      );
      return {
        correcta,
        respuestaDadaTexto: dadas.join(", ") || "(sin respuesta)",
        respuestaCorrectaTexto: c.respuestas.join(", "),
      };
    }

    case "emparejar": {
      const elegidos = respuesta as RespuestaEmparejar;
      const correcta = c.pares.every((p) => elegidos[p.izquierda] === p.derecha);
      return {
        correcta,
        respuestaDadaTexto: c.pares
          .map((p) => `${p.izquierda} → ${elegidos[p.izquierda] ?? "?"}`)
          .join(", "),
        respuestaCorrectaTexto: c.pares.map((p) => `${p.izquierda} → ${p.derecha}`).join(", "),
      };
    }

    case "ordenar_palabras": {
      const orden = respuesta as RespuestaOrdenarPalabras;
      const correcta =
        orden.length === c.orden_correcto.length &&
        orden.every((idx, i) => idx === c.orden_correcto[i]);
      return {
        correcta,
        respuestaDadaTexto: orden.map((i) => c.palabras[i]).join(" "),
        respuestaCorrectaTexto: c.orden_correcto.map((i) => c.palabras[i]).join(" "),
      };
    }

    case "verdadero_falso": {
      const elegido = respuesta as RespuestaVerdaderoFalso;
      return {
        correcta: elegido === c.es_verdadero,
        respuestaDadaTexto: elegido ? "Verdadero" : "Falso",
        respuestaCorrectaTexto: c.es_verdadero ? "Verdadero" : "Falso",
      };
    }

    case "encontrar_error": {
      const elegida = respuesta as RespuestaEncontrarError;
      return {
        correcta: normalizar(elegida) === normalizar(c.palabra_incorrecta),
        respuestaDadaTexto: elegida || "(sin respuesta)",
        respuestaCorrectaTexto: `${c.palabra_incorrecta} → ${c.correccion}`,
      };
    }
  }
}

export const ETIQUETA_TIPO_EJERCICIO: Record<Ejercicio["tipo"], string> = {
  opcion_multiple: "Opción múltiple",
  completar_espacio: "Completar el espacio",
  emparejar: "Emparejar",
  ordenar_palabras: "Ordenar palabras",
  verdadero_falso: "Verdadero o falso",
  encontrar_error: "Encontrar el error",
};
