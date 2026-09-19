import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import type { RangoMaestria } from "@/types/content";

function clampRango(n: number): RangoMaestria {
  return Math.min(Math.max(n, 1), 5) as RangoMaestria;
}

// Se llama al terminar los ejercicios de comprobación de UNA clase.
// Marca la clase como completada y, si con esto las 4 clases de la sección
// quedan completas, marca la sección como "pasada".
export async function marcarClaseCompletada(claseId: string, seccionId: string) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return { guardado: false as const };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { guardado: false as const };

  await supabase
    .from("progreso_clases")
    .upsert(
      { usuario_id: user.id, clase_id: claseId, completada: true, completada_en: new Date().toISOString() },
      { onConflict: "usuario_id,clase_id" }
    );

  const { data: clasesSeccion } = await supabase
    .from("clases")
    .select("id")
    .eq("seccion_id", seccionId);

  const { data: completadas } = await supabase
    .from("progreso_clases")
    .select("clase_id")
    .eq("usuario_id", user.id)
    .eq("completada", true);

  const idsCompletadas = new Set((completadas ?? []).map((c) => c.clase_id));
  const todasCompletas = (clasesSeccion ?? []).every((c) => idsCompletadas.has(c.id));

  if (todasCompletas) {
    await supabase
      .from("progreso_secciones")
      .upsert(
        { usuario_id: user.id, seccion_id: seccionId, pasado: true },
        { onConflict: "usuario_id,seccion_id" }
      );
  }

  return { guardado: true as const, seccionPasada: todasCompletas };
}

interface RegistrarIntentoParams {
  seccionId?: string;
  nivelId?: string;
  puntaje: number; // 0..1
}

// Se llama al terminar una prueba de cierre de sección o una prueba final de nivel.
// Guarda el intento; si es de sección y aprobó (>=60%), sube el contador de
// repeticiones aprobadas y el rango de maestría (tope 5 = Maestro).
export async function registrarIntentoPrueba({
  seccionId,
  nivelId,
  puntaje,
}: RegistrarIntentoParams) {
  const supabase = createSupabaseBrowserClient();
  if (!supabase) return { guardado: false as const };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { guardado: false as const };

  const aprobado = puntaje >= 0.6;

  await supabase.from("intentos_prueba").insert({
    usuario_id: user.id,
    seccion_id: seccionId ?? null,
    nivel_id: nivelId ?? null,
    puntaje,
    aprobado,
  });

  if (seccionId && aprobado) {
    const { data: actual } = await supabase
      .from("progreso_secciones")
      .select("repeticiones_aprobadas")
      .eq("usuario_id", user.id)
      .eq("seccion_id", seccionId)
      .maybeSingle();

    const nuevasRepeticiones = (actual?.repeticiones_aprobadas ?? 0) + 1;

    await supabase.from("progreso_secciones").upsert(
      {
        usuario_id: user.id,
        seccion_id: seccionId,
        repeticiones_aprobadas: nuevasRepeticiones,
        rango: clampRango(nuevasRepeticiones),
      },
      { onConflict: "usuario_id,seccion_id" }
    );
  }

  return { guardado: true as const, aprobado };
}
