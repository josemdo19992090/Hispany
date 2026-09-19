import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigurado = Boolean(supabaseUrl && supabaseAnonKey);

// Cliente de Supabase para Client Components (maneja la sesión vía cookies).
export function createSupabaseBrowserClient() {
  if (!supabaseConfigurado) return null;
  return createBrowserClient(supabaseUrl as string, supabaseAnonKey as string);
}
