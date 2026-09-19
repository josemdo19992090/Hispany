import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Link from "next/link";
import ChiguiMascot from "@/components/ChiguiMascot";
import HeaderAuth from "@/components/HeaderAuth";
import SelectorIdioma from "@/components/ui/SelectorIdioma";
import { IdiomaProvider } from "@/lib/i18n/context";
import { obtenerIdioma } from "@/lib/i18n/server";
import "./globals.css";

// Nunito: redondeada y legible, encaja con el tono infantil/educativo mucho
// mejor que Geist (que es una tipografía de producto técnico).
// El subconjunto cirílico es obligatorio: la interfaz tiene selector ES/RU y
// sin él los textos en ruso se verían con fuente de respaldo.
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const idioma = await obtenerIdioma();

  return (
    <html lang={idioma}>
      <body
        className={`${nunito.variable} bg-chigui-cream text-chigui-brown-dark antialiased`}
      >
        <IdiomaProvider idiomaInicial={idioma}>
          <header className="sticky top-0 z-10 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
              <Link href="/" className="flex items-center gap-2">
                <ChiguiMascot className="h-10 w-10" />
                <span className="text-xl font-extrabold tracking-tight">Hispany</span>
              </Link>
              <div className="ml-auto flex items-center gap-3">
                <SelectorIdioma />
                <HeaderAuth />
              </div>
            </div>
            {/* Los colores de la bandera como una línea fina bajo el header, en
                vez de tres barritas sueltas que parecían una calcomanía. */}
            <div className="h-[3px] bg-gradient-to-r from-brand-yellow via-brand-blue to-brand-red" />
          </header>
          <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
        </IdiomaProvider>
      </body>
    </html>
  );
}
