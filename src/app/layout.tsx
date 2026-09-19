import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import ChiguiMascot from "@/components/ChiguiMascot";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Hispany",
  description: "Aprende español con Chigui",
};

// Fase 1: el contenido se administra en Supabase y aún no hay revalidación
// incremental configurada, así que pedimos datos frescos en cada request.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-chigui-cream text-chigui-brown-dark`}
      >
        <header className="border-b-4 border-brand-yellow bg-white">
          <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
            <Link href="/" className="flex items-center gap-2">
              <ChiguiMascot className="h-10 w-12" />
              <span className="text-xl font-extrabold tracking-tight">
                Hispany
              </span>
            </Link>
            <span className="ml-auto h-2 w-10 rounded-full bg-brand-yellow" />
            <span className="h-2 w-10 rounded-full bg-brand-blue" />
            <span className="h-2 w-10 rounded-full bg-brand-red" />
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
