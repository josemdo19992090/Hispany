import { Lock } from "lucide-react";

export default function ContenidoBloqueado({ mensaje }: { mensaje: string }) {
  return (
    <div className="rounded-card bg-white p-6 text-center shadow-soft">
      <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow/20 text-chigui-brown-dark">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mb-1 font-bold">Contenido premium</p>
      <p className="mx-auto max-w-sm text-sm text-chigui-brown">{mensaje}</p>
    </div>
  );
}
