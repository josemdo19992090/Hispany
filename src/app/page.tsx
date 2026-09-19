import Link from "next/link";
import { getNiveles } from "@/lib/data";
import ChiguiMascot from "@/components/ChiguiMascot";

export default async function HomePage() {
  const niveles = await getNiveles();
  return (
    <div>
      <div className="mb-8 flex items-center gap-4 rounded-xl2 bg-white p-5 shadow-sm">
        <ChiguiMascot className="h-20 w-24 shrink-0" />
        <div>
          <h1 className="text-2xl font-extrabold">¡Hola! Soy Chigui 👋</h1>
          <p className="text-chigui-brown">
            Elige un nivel para empezar a aprender español.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {niveles
          .sort((a, b) => a.orden - b.orden)
          .map((nivel) => (
            <Link
              key={nivel.id}
              href={`/niveles/${nivel.codigo}`}
              className="rounded-xl2 border-2 border-chigui-tan bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-2 inline-block rounded-full bg-brand-green px-3 py-1 text-sm font-bold text-white">
                {nivel.codigo}
              </div>
              <h2 className="text-lg font-bold">{nivel.nombre}</h2>
              {nivel.descripcion && (
                <p className="mt-1 text-sm text-chigui-brown">{nivel.descripcion}</p>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
}
