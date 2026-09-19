import type { PerfilAlumno, Usuario } from "@/types/content";

// Antes esto siempre caía en "ninos" salvo que la URL trajera ?perfil=,
// ignorando el perfil guardado en la cuenta del alumno. Prioridad:
// 1) ?perfil= explícito en la URL (el alumno lo cambió a mano)
// 2) el perfil guardado en su cuenta, si hay sesión
// 3) "ninos" por defecto (visitante sin cuenta)
export function resolverPerfilActivo(
  perfilEnURL: string | undefined,
  usuario: Usuario | null
): PerfilAlumno {
  if (perfilEnURL === "ninos" || perfilEnURL === "trabajo_viajes") return perfilEnURL;
  return usuario?.perfil ?? "ninos";
}
