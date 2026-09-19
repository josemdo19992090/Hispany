"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUsuarioActual } from "@/lib/data";
import { generarVarianteEjercicio } from "@/lib/gemini";
import type { Ejercicio } from "@/types/content";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase no configurado.");
  const usuario = await getUsuarioActual(supabase);
  if (!usuario || usuario.rol !== "admin") throw new Error("No autorizado.");
  return { supabase, usuario };
}

export async function accionGenerarVariante(ejercicioBaseId: string) {
  const { supabase } = await requireAdmin();

  const { data: base, error } = await supabase
    .from("ejercicios")
    .select("*")
    .eq("id", ejercicioBaseId)
    .single();
  if (error || !base) throw new Error("No se encontró el ejercicio base.");

  const { contenido } = await generarVarianteEjercicio(base as Ejercicio);
  return { contenido, base: base as Ejercicio };
}

export async function accionPublicarVariante(params: {
  ejercicioBaseId: string;
  contenido: unknown;
}) {
  const { supabase, usuario } = await requireAdmin();

  const { data: base, error } = await supabase
    .from("ejercicios")
    .select("*")
    .eq("id", params.ejercicioBaseId)
    .single();
  if (error || !base) throw new Error("No se encontró el ejercicio base.");

  const { error: insertError } = await supabase.from("ejercicios").insert({
    clase_id: base.clase_id,
    seccion_id: base.seccion_id,
    nivel_id: base.nivel_id,
    perfil: base.perfil,
    tipo: base.tipo,
    orden: base.orden,
    contenido: params.contenido,
    is_premium: true,
    es_variante_ia: true,
    estado_revision_ia: "aprobado",
    variante_base_id: base.id,
    created_by: usuario.id,
  });
  if (insertError) throw insertError;

  return { ok: true };
}
