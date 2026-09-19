import type { ElementType, ReactNode } from "react";
import { ui, type ClaveUI } from "@/lib/i18n/diccionario";

type ModoBilingue = "apilado" | "en_linea";

interface Props {
  clave: ClaveUI;
  as?: ElementType;
  modo?: ModoBilingue;
  className?: string;
  claseRu?: string;
  sufijo?: ReactNode; // para casos como "Pregunta 1 de 7" con números dinámicos
}

// Interfaz bilingüe: español primero (es el idioma que se está aprendiendo,
// verlo reforzado en toda la app ayuda a la inmersión), ruso de apoyo debajo/
// al lado en menor tamaño. Decisión del dueño — ver CLAUDE.md.
export default function TextoBilingue({
  clave,
  as: Tag = "span",
  modo = "apilado",
  className = "",
  claseRu = "",
  sufijo,
}: Props) {
  const { ru, es } = ui[clave];

  if (modo === "en_linea") {
    return (
      <Tag className={className}>
        {es}
        {sufijo}{" "}
        <span className={`font-normal opacity-70 ${claseRu}`}>
          ({ru}
          {sufijo})
        </span>
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      <span className="block">
        {es}
        {sufijo}
      </span>
      <span className={`block text-xs font-normal opacity-60 ${claseRu}`}>
        {ru}
        {sufijo}
      </span>
    </Tag>
  );
}
