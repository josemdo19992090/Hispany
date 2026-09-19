"use client";

import type { ElementType, ReactNode } from "react";
import { ui, type ClaveUI } from "@/lib/i18n/diccionario";
import { useIdioma } from "@/lib/i18n/context";

// Reemplaza al antiguo TextoBilingue (mostraba los dos idiomas apilados en
// toda la interfaz general — el dueño lo encontró ruidoso). Ahora muestra
// solo el idioma activo, elegido con el selector ES/RU del header.
export default function Texto({
  clave,
  as: Tag = "span",
  className = "",
  sufijo,
}: {
  clave: ClaveUI;
  as?: ElementType;
  className?: string;
  sufijo?: ReactNode;
}) {
  const { idioma } = useIdioma();
  return (
    <Tag className={className}>
      {ui[clave][idioma]}
      {sufijo}
    </Tag>
  );
}
