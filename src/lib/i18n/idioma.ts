export type Idioma = "es" | "ru";

export const IDIOMA_COOKIE = "hispany-idioma";
export const IDIOMA_POR_DEFECTO: Idioma = "es";

export function esIdiomaValido(valor: string | undefined): valor is Idioma {
  return valor === "es" || valor === "ru";
}
