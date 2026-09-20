// Traducción de metadata de navegación del contenido (nombre/descripción de
// nivel): no es contenido pedagógico, es la etiqueta con la que el alumno
// elige qué nivel abrir, así que sigue al selector de idioma como el resto
// del chrome. Si falta la traducción al ruso todavía, se muestra el español
// como respaldo en vez de dejar el texto vacío.

import type { ClaseVersion, Nivel } from "@/types/content";
import type { Idioma } from "./idioma";

export function nombreNivel(nivel: Nivel, idioma: Idioma): string {
  if (idioma === "ru" && nivel.nombre_ru) return nivel.nombre_ru;
  return nivel.nombre;
}

export function descripcionNivel(nivel: Nivel, idioma: Idioma): string | null {
  if (idioma === "ru" && nivel.descripcion_ru) return nivel.descripcion_ru;
  return nivel.descripcion;
}

// Mismo patrón de respaldo que nombreNivel/descripcionNivel, para los cuatro
// bloques de una clase (lectura, conversación, gramática, escritura). Ver el
// comentario en ClaseVersion (src/types/content.ts) sobre cuándo un bloque
// entero pasa a ruso vs. cuándo el español dentro de él se mantiene.
type BloqueClase = "lectura" | "conversacion" | "gramatica" | "escritura";

export function textoClase(version: ClaseVersion, bloque: BloqueClase, idioma: Idioma): string {
  if (idioma === "ru") {
    const enRuso = version[`${bloque}_ru`];
    if (enRuso) return enRuso;
  }
  return version[`${bloque}_md`];
}
