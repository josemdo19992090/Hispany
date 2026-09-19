import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export async function reportarErrorEjercicio(ejercicioId: string, mensaje: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return { guardado: false as const };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { guardado: false as const };

  const { error } = await supabase.from("reportes_ejercicio").insert({
    ejercicio_id: ejercicioId,
    usuario_id: user.id,
    mensaje,
  });
  if (error) throw error;

  return { guardado: true as const };
}
