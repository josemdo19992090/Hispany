import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para uso en el navegador (Fase 1 todavía no lo consume ninguna
// pantalla; se usa datos de prueba locales hasta conectar un proyecto real).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigurado = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = supabaseConfigurado
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
