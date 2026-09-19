import Image from "next/image";
import { ChevronRight, Lock } from "lucide-react";
import { getNiveles } from "@/lib/data";
import ChiguiMascot from "@/components/ChiguiMascot";
import { TarjetaEnlace, TarjetaBloqueada } from "@/components/ui/Tarjeta";
import Texto from "@/components/ui/Texto";
import { obtenerIdioma } from "@/lib/i18n/server";
import { nombreNivel, descripcionNivel } from "@/lib/i18n/contenido";

// Ilustración de Chigui por nivel: crece con el nivel (bebé en A1, graduado
// en C2). Cubre A1-C2 aunque hoy solo A1/A2 existan en la base de datos,
// para poder previsualizar en esta pantalla cómo se vería la progresión
// completa antes de construir el contenido real de B1-C2.
const ILUSTRACION_NIVEL: Record<string, string> = {
  A1: "/niveles/A1.png",
  A2: "/niveles/A2.png",
  B1: "/niveles/B1.png",
  B2: "/niveles/B2.png",
  C1: "/niveles/C1.png",
  C2: "/niveles/C2.png",
};

// Solo vista previa: estos niveles no tienen contenido en la base de datos
// todavía, así que no son navegables. Se muestran apagados/bloqueados nada
// más para ver la progresión completa en la pantalla.
const NIVELES_PROXIMAMENTE = [
  { codigo: "B1", nombre: "B1 - Intermedio" },
  { codigo: "B2", nombre: "B2 - Intermedio alto" },
  { codigo: "C1", nombre: "C1 - Avanzado" },
  { codigo: "C2", nombre: "C2 - Maestría" },
];

export default async function HomePage() {
  const niveles = await getNiveles();
  const idioma = await obtenerIdioma();
  const codigosReales = new Set(niveles.map((n) => n.codigo));

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
            <div className="flex items-start gap-3">
              {ILUSTRACION_NIVEL[nivel.codigo] && (
                <Image
                  src={ILUSTRACION_NIVEL[nivel.codigo]}
                  alt=""
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 object-contain"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-brand-green px-3 py-1 text-sm font-bold text-white">
                    {nivel.codigo}
                  </span>
                  <ChevronRight className="ml-auto h-5 w-5 text-chigui-tan" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold">{nombreNivel(nivel, idioma)}</h3>
                {descripcionNivel(nivel, idioma) && (
                  <p className="mt-1 text-sm text-chigui-brown">
                    {descripcionNivel(nivel, idioma)}
                  </p>
                )}
              </div>
            </div>
          </TarjetaEnlace>
        ))}

        {NIVELES_PROXIMAMENTE.filter((n) => !codigosReales.has(n.codigo)).map((nivel) => (
          <TarjetaBloqueada key={nivel.codigo} className="p-5">
            <div className="flex items-start gap-3">
              <Image
                src={ILUSTRACION_NIVEL[nivel.codigo]}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 object-contain opacity-50"
              />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-chigui-tan/60 px-3 py-1 text-sm font-bold text-white">
                    {nivel.codigo}
                  </span>
                  <Lock className="ml-auto h-4 w-4 text-chigui-tan" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-chigui-brown-dark">{nivel.nombre}</h3>
                <p className="mt-1 text-sm text-chigui-brown">
                  <Texto clave="proximamente" />
                </p>
              </div>
            </div>
          </TarjetaBloqueada>
        ))}
      </div>
    </div>
  );
}
