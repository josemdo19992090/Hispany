import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variante = "primario" | "secundario" | "peligro" | "fantasma";
type Tamano = "sm" | "md";

const VARIANTES: Record<Variante, string> = {
  primario: "bg-brand-green text-white hover:brightness-110",
  secundario: "bg-white text-chigui-brown-dark shadow-soft hover:shadow-soft-lg",
  peligro: "bg-brand-red text-white hover:brightness-110",
  fantasma: "text-chigui-brown hover:bg-chigui-tan/20",
};

const TAMANOS: Record<Tamano, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
};

function clases(variante: Variante, tamano: Tamano, extra?: string) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-bold",
    "transition active:scale-95 disabled:pointer-events-none disabled:opacity-40",
    VARIANTES[variante],
    TAMANOS[tamano],
    extra ?? "",
  ].join(" ");
}

export default function Boton({
  variante = "primario",
  tamano = "md",
  className,
  children,
  ...props
}: {
  variante?: Variante;
  tamano?: Tamano;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={clases(variante, tamano, className)} {...props}>
      {children}
    </button>
  );
}

export function BotonEnlace({
  variante = "primario",
  tamano = "md",
  className,
  children,
  ...props
}: {
  variante?: Variante;
  tamano?: Tamano;
  children: ReactNode;
} & ComponentProps<typeof Link>) {
  return (
    <Link className={clases(variante, tamano, className)} {...props}>
      {children}
    </Link>
  );
}
