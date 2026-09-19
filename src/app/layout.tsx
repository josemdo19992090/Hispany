import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Link from "next/link";
import ChiguiMascot from "@/components/ChiguiMascot";
import HeaderAuth from "@/components/HeaderAuth";
import "./globals.css";

// Nunito: redondeada y legible, encaja con el tono infantil/educativo mucho
// mejor que Geist (que es una tipografía de producto técnico).
// El subconjunto cirílico es obligatorio: la interfaz va a ser bilingüe
// ruso/español y sin él los textos en ruso se verían con fuente de respaldo.
const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hispany",
  description: "Aprende español con Chigui",
};

// El contenido se administra en Supabase y aún no hay revalidación incremental
// configurada, así que pedimos datos frescos en cada request.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} bg-chigui-cream text-chigui-brown-dark antialiased`}
      >
        <header className="sticky top-0 z-10 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <ChiguiMascot className="h-10 w-10" />
              <span className="text-xl font-extrabold tracking-tight">Hispany</span>
            </Link>
            <div className="ml-auto">
              <HeaderAuth />
            </div>
          </div>
          {/* Los colores de la bandera como una línea fina bajo el header, en
              vez de tres barritas sueltas que parecían una calcomanía. */}
          <div className="h-[3px] bg-gradient-to-r from-brand-yellow via-brand-blue to-brand-red" />
        </header>
        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
