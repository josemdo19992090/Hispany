import type { Usuario } from "@/types/content";

export const DIAS_TRIAL = 7;

export interface EstadoPremium {
  esPremium: boolean; // true si tiene acceso premium ahora mismo (pagado o en trial)
  enTrial: boolean; // true si el acceso viene del trial gratuito, no de una cuenta paga
  diasRestantesTrial: number | null; // null si no aplica (pagó, o el trial ya expiró)
}

// Todo estudiante nuevo tiene acceso premium completo durante sus primeros
// DIAS_TRIAL días desde el registro (fecha_inicio), sin necesidad de pagar.
// Pasado ese período, vuelve a las reglas freemium normales salvo que
// es_premium ya esté marcado true (cuenta paga).
export function calcularEstadoPremium(usuario: Usuario | null): EstadoPremium {
  if (!usuario) return { esPremium: false, enTrial: false, diasRestantesTrial: null };
  if (usuario.es_premium) return { esPremium: true, enTrial: false, diasRestantesTrial: null };

  const inicio = new Date(usuario.fecha_inicio).getTime();
  const ahora = Date.now();
  const diasTranscurridos = (ahora - inicio) / (1000 * 60 * 60 * 24);
  const diasRestantes = Math.ceil(DIAS_TRIAL - diasTranscurridos);

  if (diasRestantes > 0) {
    return { esPremium: true, enTrial: true, diasRestantesTrial: diasRestantes };
  }
  return { esPremium: false, enTrial: false, diasRestantesTrial: null };
}
