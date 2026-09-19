import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Ejercicio, EjercicioContenido, TipoEjercicio } from "@/types/content";
import { PLANTILLA_CONTENIDO } from "@/lib/admin-ejercicios";

// Solo se importa desde Server Actions / Route Handlers: la API key nunca
// llega al navegador porque no tiene el prefijo NEXT_PUBLIC_.
function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no está configurada en .env.local.");
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
}

function limpiarRespuestaJSON(texto: string): string {
  return texto
    .trim()
    .replace(/^```(json)?/i, "")
    .replace(/```$/, "")
    .trim();
}

function validarForma(tipo: TipoEjercicio, c: unknown): c is EjercicioContenido {
  if (!c || typeof c !== "object") return false;
  const obj = c as Record<string, unknown>;
  if (obj.tipo !== tipo) return false;
  switch (tipo) {
    case "opcion_multiple":
      return (
        typeof obj.pregunta === "string" &&
        Array.isArray(obj.opciones) &&
        obj.opciones.length >= 2 &&
        typeof obj.respuesta_correcta === "number"
      );
    case "completar_espacio":
      return typeof obj.texto === "string" && Array.isArray(obj.respuestas);
    case "emparejar":
      return Array.isArray(obj.pares) && obj.pares.length >= 2;
    case "ordenar_palabras":
      return Array.isArray(obj.palabras) && Array.isArray(obj.orden_correcto);
    case "verdadero_falso":
      return typeof obj.afirmacion === "string" && typeof obj.es_verdadero === "boolean";
    case "encontrar_error":
      return (
        typeof obj.texto === "string" &&
        typeof obj.palabra_incorrecta === "string" &&
        typeof obj.correccion === "string"
      );
  }
}

const ETIQUETA_PERFIL: Record<string, string> = {
  ninos: "niños (lenguaje sencillo, tono lúdico, ejemplos con la mascota Chigui, un capibara)",
  trabajo_viajes: "adultos que aprenden español para trabajo y viajes (tono práctico y formal)",
};

export async function generarVarianteEjercicio(ejercicioBase: Ejercicio): Promise<{
  contenido: EjercicioContenido;
}> {
  const model = getModel();
  const plantilla = PLANTILLA_CONTENIDO[ejercicioBase.tipo];

  const prompt = `Eres un asistente que crea ejercicios de español para rusohablantes que estudian español en la app Hispany.

Genera UNA variante NUEVA del ejercicio de abajo. Debe ser del mismo tipo "${ejercicioBase.tipo}" y usar EXACTAMENTE la misma forma de JSON que el ejemplo de formato, pero con contenido distinto (otras palabras, otra frase u otro tema), manteniendo un nivel de dificultad similar. El perfil de alumno es: ${ETIQUETA_PERFIL[ejercicioBase.perfil] ?? ejercicioBase.perfil}.

Ejercicio original:
${JSON.stringify(ejercicioBase.contenido, null, 2)}

Formato exacto que debe tener tu respuesta (mismo tipo "${ejercicioBase.tipo}", solo cambia el contenido):
${JSON.stringify(plantilla, null, 2)}

Responde ÚNICAMENTE con el JSON de la variante nueva. Sin explicación, sin markdown, sin comentarios.`;

  const result = await model.generateContent(prompt);
  const texto = limpiarRespuestaJSON(result.response.text());

  let contenido: unknown;
  try {
    contenido = JSON.parse(texto);
  } catch {
    throw new Error(`La IA no devolvió JSON válido: ${texto.slice(0, 200)}`);
  }

  if (!validarForma(ejercicioBase.tipo, contenido)) {
    throw new Error(
      `La IA devolvió un JSON con forma inesperada para el tipo "${ejercicioBase.tipo}".`
    );
  }

  return { contenido };
}
