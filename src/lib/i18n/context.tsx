"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IDIOMA_COOKIE, type Idioma } from "./idioma";

interface ContextoIdioma {
  idioma: Idioma;
  cambiarIdioma: (nuevo: Idioma) => void;
}

const Contexto = createContext<ContextoIdioma | null>(null);

// El valor inicial viene del servidor (cookie leída en el layout) para que no
// haya parpadeo entre idiomas al cargar. Al cambiarlo, se guarda en la misma
// cookie y se refresca la ruta para que las Server Components (la mayoría de
// las páginas) vuelvan a renderizar ya en el idioma nuevo.
export function IdiomaProvider({
  idiomaInicial,
  children,
}: {
  idiomaInicial: Idioma;
  children: ReactNode;
}) {
  const [idioma, setIdioma] = useState<Idioma>(idiomaInicial);
  const router = useRouter();

  const cambiarIdioma = (nuevo: Idioma) => {
    setIdioma(nuevo);
    document.cookie = `${IDIOMA_COOKIE}=${nuevo}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <Contexto.Provider value={{ idioma, cambiarIdioma }}>{children}</Contexto.Provider>
  );
}

export function useIdioma(): ContextoIdioma {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useIdioma() debe usarse dentro de <IdiomaProvider>.");
  return ctx;
}
