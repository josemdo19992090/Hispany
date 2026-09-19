import { supabase, supabaseConfigurado } from "@/lib/supabase/client";
import type { Clase, ClaseVersion, Ejercicio, Nivel, Seccion } from "@/types/content";

// Capa de acceso a datos: lee de Supabase. Lanza un error explícito si el
// proyecto todavía no está conectado (ver .env.local.example).
function requireSupabase() {
  if (!supabaseConfigurado || !supabase) {
    throw new Error(
      "Supabase no está configurado. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local."
    );
  }
  return supabase;
}

export async function getNiveles(): Promise<Nivel[]> {
  const db = requireSupabase();
  const { data, error } = await db.from("niveles").select("*").order("orden");
  if (error) throw error;
  return data as Nivel[];
}

export async function getNivelPorCodigo(codigo: string): Promise<Nivel | null> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("niveles")
    .select("*")
    .ilike("codigo", codigo)
    .maybeSingle();
  if (error) throw error;
  return data as Nivel | null;
}

export async function getSeccionesPorNivel(nivelId: string): Promise<Seccion[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("secciones")
    .select("*")
    .eq("nivel_id", nivelId)
    .order("orden");
  if (error) throw error;
  return data as Seccion[];
}

export async function getClasesPorSeccion(seccionId: string): Promise<Clase[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("clases")
    .select("*")
    .eq("seccion_id", seccionId)
    .order("orden");
  if (error) throw error;
  return data as Clase[];
}

export async function getVersionClase(
  claseId: string,
  perfil: string
): Promise<ClaseVersion | null> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("clase_versiones")
    .select("*")
    .eq("clase_id", claseId)
    .eq("perfil", perfil)
    .maybeSingle();
  if (error) throw error;
  return data as ClaseVersion | null;
}

export async function getEjerciciosPorClase(claseId: string): Promise<Ejercicio[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("ejercicios")
    .select("*")
    .eq("clase_id", claseId)
    .order("orden");
  if (error) throw error;
  return data as Ejercicio[];
}
