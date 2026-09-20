import { Fragment } from "react";

// El contenido de las clases se guarda con markdown mínimo (**negrita** y
// *cursiva*), más saltos de línea simples: una línea en blanco separa
// párrafos, un solo salto es un <br/> (para listas letra por letra como el
// abecedario, sin meter una librería de markdown completa).
function renderizarLinea(linea: string, key: number) {
  const partes = linea.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <Fragment key={key}>
      {partes.map((parte, i) => {
        if (parte.startsWith("**") && parte.endsWith("**")) {
          return <strong key={i}>{parte.slice(2, -2)}</strong>;
        }
        if (parte.startsWith("*") && parte.endsWith("*")) {
          return <em key={i}>{parte.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{parte}</Fragment>;
      })}
    </Fragment>
  );
}

export default function TextoConFormato({
  texto,
  className = "",
}: {
  texto: string;
  className?: string;
}) {
  const parrafos = texto.split(/\n\s*\n/);

  return (
    <div className={className}>
      {parrafos.map((parrafo, p) => (
        <p key={p} className={p > 0 ? "mt-3" : undefined}>
          {parrafo.split("\n").map((linea, l, lineas) => (
            <Fragment key={l}>
              {renderizarLinea(linea, l)}
              {l < lineas.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
