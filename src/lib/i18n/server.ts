import { cookies } from "next/headers";
import { IDIOMA_COOKIE, IDIOMA_POR_DEFECTO, esIdiomaValido, type Idioma } from "./idioma";

// Lee el idioma elegido desde la cookie (Server Components / Route Handlers).
export async function obtenerIdioma(): Promise<Idioma> {
  const valor = (await cookies()).get(IDIOMA_COOKIE)?.value;
  return esIdiomaValido(valor) ? valor : IDIOMA_POR_DEFECTO;
}
