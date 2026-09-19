import { ChevronRight } from "lucide-react";
import { getNiveles } from "@/lib/data";
import ChiguiMascot from "@/components/ChiguiMascot";
import { TarjetaEnlace } from "@/components/ui/Tarjeta";
import Texto from "@/components/ui/Texto";
import { obtenerIdioma } from "@/lib/i18n/server";
import { nombreNivel, descripcionNivel } from "@/lib/i18n/contenido";

export default async function HomePage() {
  const niveles = await getNiveles();
  const idioma = await obtenerIdioma();

  return (
    <div>
      <section className="mb-8 flex items-center gap-4 rounded-card bg-white p-5 shadow-soft">
        <ChiguiMascot className="h-20 w-20 shrink-0" pose="saludando" />
        <div>
          <Texto clave="holaSoyChigui" as="h1" className="text-2xl font-extrabold" />
          <Texto clave="elgieNivel" as="p" className="mt-1 text-chigui-brown" />
        </div>
      </section>

      <Texto
        clave="niveles"
        as="h2"
        className="mb-3 text-sm font-bold uppercase tracking-wide text-chigui-brown"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {niveles.map((nivel) => (
          <TarjetaEnlace key={nivel.id} href={`/niveles/${nivel.codigo}`} className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-brand-green px-3 py-1 text-sm font-bold text-white">
                {nivel.codigo}
              </span>
              <ChevronRight
                className="ml-auto h-5 w-5 text-chigui-tan"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-lg font-bold">{nombreNivel(nivel, idioma)}</h3>
            {descripcionNivel(nivel, idioma) && (
              <p className="mt-1 text-sm text-chigui-brown">{descripcionNivel(nivel, idioma)}</p>
            )}
          </TarjetaEnlace>
        ))}
      </div>
    </div>
  );
}
