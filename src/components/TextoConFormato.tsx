import { Fragment } from "react";

// El contenido de las clases se guarda con markdown mínimo (**negrita** y
// *cursiva*). No metemos una librería de markdown completa por dos marcas:
// esto las convierte a <strong>/<em> y deja el resto como texto plano.
export default function TextoConFormato({
  texto,
  className = "",
}: {
  texto: string;
  className?: string;
}) {
  const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);

  return (
    <p className={className}>
      {partes.map((parte, i) => {
        if (parte.startsWith("**") && parte.endsWith("**")) {
          return <strong key={i}>{parte.slice(2, -2)}</strong>;
        }
        if (parte.startsWith("*") && parte.endsWith("*")) {
          return <em key={i}>{parte.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{parte}</Fragment>;
      })}
    </p>
  );
}
