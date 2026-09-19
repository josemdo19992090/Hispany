import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase, supabaseConfigurado } from "@/lib/supabase/client";
import type { Clase, ClaseVersion, Ejercicio, Nivel, Seccion, Usuario } from "@/types/content";

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

export async function getEjerciciosPorSeccion(seccionId: string): Promise<Ejercicio[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("ejercicios")
    .select("*")
    .eq("seccion_id", seccionId)
    .order("orden");
  if (error) throw error;
  return data as Ejercicio[];
}

export async function getEjerciciosPorNivel(nivelId: string): Promise<Ejercicio[]> {
  const db = requireSupabase();
  const { data, error } = await db
    .from("ejercicios")
    .select("*")
    .eq("nivel_id", nivelId)
    .order("orden");
  if (error) throw error;
  return data as Ejercicio[];
}

// Estas dos funciones leen tablas protegidas por RLS (auth.uid() = usuario_id),
// así que necesitan el cliente de Supabase autenticado de la request (con la
// cookie de sesión), no el cliente público anónimo que usa el resto de este
// archivo. El caller (un Server Component) lo obtiene con
// `createSupabaseServerClient()` y lo pasa aquí.
export async function getClasesCompletadas(
  authedClient: SupabaseClient,
  usuarioId: string,
  seccionId: string
): Promise<Set<string>> {
  const clasesSeccion = await getClasesPorSeccion(seccionId);
  const idsClases = clasesSeccion.map((c) => c.id);
  if (idsClases.length === 0) return new Set();
  const { data, error } = await authedClient
    .from("progreso_clases")
    .select("clase_id")
    .eq("usuario_id", usuarioId)
    .eq("completada", true)
    .in("clase_id", idsClases);
  if (error) throw error;
  return new Set((data ?? []).map((d) => d.clase_id));
}

// Perfil de aplicación (tabla `usuarios`) del usuario autenticado en esta request.
// null si no hay sesión. Se usa para decidir qué contenido está bloqueado
// (freemium): la sección, los ejercicios premium y las pruebas.
export async function getUsuarioActual(authedClient: SupabaseClient): Promise<Usuario | null> {
  const {
    data: { user },
  } = await authedClient.auth.getUser();
  if (!user) return null;

  const { data, error } = await authedClient
    .from("usuarios")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data as Usuario | null;
}

export interface ProgresoSeccionResumen {
  pasado: boolean;
  rango: number;
  repeticiones_aprobadas: number;
}

export async function getProgresoSecciones(
  authedClient: SupabaseClient,
  usuarioId: string
): Promise<Record<string, ProgresoSeccionResumen>> {
  const { data, error } = await authedClient
    .from("progreso_secciones")
    .select("seccion_id, pasado, rango, repeticiones_aprobadas")
    .eq("usuario_id", usuarioId);
  if (error) throw error;
  const mapa: Record<string, ProgresoSeccionResumen> = {};
  for (const fila of data ?? []) {
    mapa[fila.seccion_id] = {
      pasado: fila.pasado,
      rango: fila.rango,
      repeticiones_aprobadas: fila.repeticiones_aprobadas,
    };
  }
  return mapa;
}
