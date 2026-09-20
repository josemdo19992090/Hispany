import type { Idioma } from "@/lib/i18n/idioma";
import { VOCALES, CONSONANTES, type Letra } from "@/lib/abecedario";

function TablaLetras({
  filas,
  idioma,
  encabezado,
}: {
  filas: Letra[];
  idioma: Idioma;
  encabezado: string;
}) {
  const conNotas = idioma === "ru";
  return (
    <div className="overflow-x-auto">
      <p className="mb-2 text-sm font-bold text-chigui-brown">{encabezado}</p>
      <table className="w-full min-w-[480px] border-separate border-spacing-y-1 text-left text-sm">
        <thead>
          <tr className="text-xs font-bold uppercase tracking-wide text-chigui-brown">
            <th className="px-2 py-1">Aa</th>
            <th className="px-2 py-1">{idioma === "ru" ? "Название" : "Nombre"}</th>
            <th className="px-2 py-1">{idioma === "ru" ? "Звук" : "Sonido"}</th>
            <th className="px-2 py-1">{idioma === "ru" ? "Пример" : "Ejemplo"}</th>
            {conNotas && <th className="px-2 py-1">Заметка</th>}
          </tr>
        </thead>
        <tbody>
          {filas.map((letra) => (
            <tr key={letra.mayuscula} className="bg-chigui-cream/60">
              <td className="rounded-l-field px-2 py-1.5 font-bold text-brand-green">
                {letra.mayuscula} {letra.minuscula}
              </td>
              <td className="px-2 py-1.5">{letra.nombre}</td>
              <td className="px-2 py-1.5 font-mono text-chigui-brown-dark">{letra.sonido}</td>
              <td className={`px-2 py-1.5 italic ${!conNotas ? "rounded-r-field" : ""}`}>
                {letra.ejemplo}
              </td>
              {conNotas && (
                <td className="rounded-r-field px-2 py-1.5 text-chigui-brown">
                  {letra.nota ?? "—"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TablaAbecedario({ idioma }: { idioma: Idioma }) {
  return (
    <div className="flex flex-col gap-4">
      <TablaLetras filas={VOCALES} idioma={idioma} encabezado={idioma === "ru" ? "Гласные" : "Vocales"} />
      <TablaLetras
        filas={CONSONANTES}
        idioma={idioma}
        encabezado={idioma === "ru" ? "Согласные" : "Consonantes"}
      />
    </div>
  );
}
