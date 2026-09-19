import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Superficie base de la app. Sin bordes: la jerarquía la dan la sombra y el
// tamaño, no una línea marrón alrededor de cada cosa.
const BASE = "block rounded-card bg-white p-4 shadow-soft";
const INTERACTIVA =
  "transition hover:-translate-y-0.5 hover:shadow-soft-lg active:translate-y-0 active:scale-[.99]";

export default function Tarjeta({
  className,
  children,
  ...props
}: { children: ReactNode } & ComponentProps<"div">) {
  return (
    <div className={`${BASE} ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}

export function TarjetaEnlace({
  className,
  children,
  ...props
}: { children: ReactNode } & ComponentProps<typeof Link>) {
  return (
    <Link className={`${BASE} ${INTERACTIVA} ${className ?? ""}`} {...props}>
      {children}
    </Link>
  );
}

// Variante apagada para contenido bloqueado (premium).
export function TarjetaBloqueada({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-card bg-white/60 p-4 shadow-none ring-1 ring-chigui-tan/40 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
