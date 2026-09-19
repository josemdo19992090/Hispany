import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  FileDown,
  GraduationCap,
  Lock,
  MessagesSquare,
  PenLine,
} from "lucide-react";
import {
  getNivelPorCodigo,
  getSeccionesPorNivel,
  getClasesPorSeccion,
  getVersionClase,
  getEjerciciosPorClase,
  getUsuarioActual,
} from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { calcularEstadoPremium } from "@/lib/premium";
import type { PerfilAlumno } from "@/types/content";
import ClaseExercisePlayer from "@/components/exercises/ClaseExercisePlayer";
import ContenidoBloqueado from "@/components/ContenidoBloqueado";
import TextoConFormato from "@/components/TextoConFormato";
import SelectorPerfil from "@/components/SelectorPerfil";
import ChiguiMascot from "@/components/ChiguiMascot";
import TextoBilingue from "@/components/ui/TextoBilingue";
import { ui, type ClaveUI } from "@/lib/i18n/diccionario";

export default async function ClasePage({
  params,
  searchParams,
}: {
  params: { nivelCodigo: string; seccionOrden: string; claseOrden: string };
  searchParams: { perfil?: string };
}) {
  const nivel = await getNivelPorCodigo(params.nivelCodigo);
  if (!nivel) notFound();

  const seccionesDelNivel = await getSeccionesPorNivel(nivel.id);
  const seccion = seccionesDelNivel.find((s) => String(s.orden) === params.seccionOrden);
  if (!seccion) notFound();

  const clasesDeSeccion = await getClasesPorSeccion(seccion.id);
  const clase = clasesDeSeccion.find((c) => String(c.orden) === params.claseOrden);
  if (!clase) notFound();

  const supabase = await createSupabaseServerClient();
  const usuario = supabase ? await getUsuarioActual(supabase) : null;
  const { esPremium } = calcularEstadoPremium(usuario);
  const seccionBloqueada = !seccion.es_gratis && !esPremium;

  if (seccionBloqueada) {
    return (
      <div>
        <Link
          href={`/niveles/${nivel.codigo}/${seccion.orden}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {seccion.titulo}
        </Link>
        <h1 className="mb-4 mt-2 text-2xl font-extrabold">{clase.titulo}</h1>
        <ContenidoBloqueado mensajeClave="mensajeSeccionPremium" />
      </div>
    );
  }

  const perfilActivo: PerfilAlumno =
    searchParams.perfil === "trabajo_viajes" ? "trabajo_viajes" : "ninos";

  const version = await getVersionClase(clase.id, perfilActivo);
  const ejerciciosDeClase = await getEjerciciosPorClase(clase.id);
  const ejerciciosClase = ejerciciosDeClase.filter((e) => e.perfil === perfilActivo);
  const ejerciciosJugables = ejerciciosClase.filter((e) => !e.is_premium || esPremium);
  const cantidadBloqueados = ejerciciosClase.length - ejerciciosJugables.length;

  return (
    <div>
      <Link
        href={`/niveles/${nivel.codigo}/${seccion.orden}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {seccion.titulo}
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-extrabold">{clase.titulo}</h1>

      <SelectorPerfil perfilActivo={perfilActivo} />

      {!version ? (
        <div className="rounded-card bg-white p-6 text-center shadow-soft">
          <ChiguiMascot className="mx-auto mb-3 h-20 w-20" pose="durmiendo" />
          <TextoBilingue clave="sinContenidoPerfil" as="p" className="text-chigui-brown" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Bloque icono={<BookOpen />} claveTitulo="lectura" texto={version.lectura_md} />
          <Bloque
            icono={<MessagesSquare />}
            claveTitulo="conversacion"
            texto={version.conversacion_md}
          />
          <Bloque icono={<GraduationCap />} claveTitulo="gramatica" texto={version.gramatica_md} />
          <Bloque icono={<PenLine />} claveTitulo="escritura" texto={version.escritura_md} />

          {esPremium ? (
            <a
              href={`/api/pdf/clase/${clase.id}?perfil=${perfilActivo}`}
              className="flex items-center justify-center gap-2 rounded-card bg-white p-4 text-center text-sm font-bold text-brand-blue shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg"
            >
              <FileDown className="h-4 w-4" aria-hidden="true" />
              <TextoBilingue clave="descargarPDF" modo="en_linea" />
            </a>
          ) : (
            <ContenidoBloqueado mensajeClave="mensajePdfPremium" />
          )}
        </div>
      )}

      <TextoBilingue
        clave="ejerciciosDeComprobacion"
        as="h2"
        className="mb-3 mt-8 text-lg font-bold"
      />
      {ejerciciosJugables.length === 0 ? (
        <div className="rounded-card bg-white p-6 text-center shadow-soft">
          <ChiguiMascot className="mx-auto mb-3 h-20 w-20" pose="durmiendo" />
          <TextoBilingue clave="sinEjerciciosPerfil" as="p" className="text-chigui-brown" />
        </div>
      ) : (
        <ClaseExercisePlayer
          key={`${clase.id}-${perfilActivo}`}
          claseId={clase.id}
          seccionId={seccion.id}
          ejercicios={ejerciciosJugables}
        />
      )}

      {cantidadBloqueados > 0 && (
        <p className="mt-4 flex flex-col items-center gap-1 rounded-card bg-white/60 p-3 text-center text-sm text-chigui-brown ring-1 ring-chigui-tan/40">
          <span className="flex items-center gap-2">
            <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
            {cantidadBloqueados} variante{cantidadBloqueados > 1 ? "s" : ""} extra premium para
            practicar más
          </span>
          <span className="text-xs opacity-70">
            Ещё {cantidadBloqueados} упражнени{cantidadBloqueados > 1 ? "й" : "е"} в премиум
          </span>
        </p>
      )}
    </div>
  );
}

function Bloque({
  icono,
  claveTitulo,
  texto,
}: {
  icono: ReactNode;
  claveTitulo: ClaveUI;
  texto: string;
}) {
  const titulo = ui[claveTitulo];
  return (
    <div className="rounded-card bg-white p-5 shadow-soft">
      <p className="mb-2 flex items-center gap-2 font-bold">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-chigui-cream text-brand-green [&>svg]:h-4 [&>svg]:w-4">
          {icono}
        </span>
        {titulo.es} <span className="font-normal opacity-60">({titulo.ru})</span>
      </p>
      <TextoConFormato texto={texto} className="text-chigui-brown" />
    </div>
  );
}
