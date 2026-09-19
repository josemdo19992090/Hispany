import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUsuarioActual } from "@/lib/data";
import { calcularEstadoPremium } from "@/lib/premium";
import CerrarSesionButton from "./CerrarSesionButton";

export default async function HeaderAuth() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-brand-green px-4 py-1.5 text-sm font-bold text-white"
      >
        Iniciar sesión
      </Link>
    );
  }

  const usuario = await getUsuarioActual(supabase);
  const { enTrial, diasRestantesTrial } = calcularEstadoPremium(usuario);

  return (
    <div className="flex items-center gap-3 text-sm">
      {usuario?.rol === "admin" && (
        <Link
          href="/admin"
          className="rounded-full border-2 border-brand-blue px-3 py-1 text-xs font-bold text-brand-blue"
        >
          Admin
        </Link>
      )}
      {enTrial && diasRestantesTrial !== null && (
        <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-chigui-brown-dark">
          🎁 {diasRestantesTrial} día{diasRestantesTrial === 1 ? "" : "s"} de prueba premium
        </span>
      )}
      <span className="hidden text-chigui-brown sm:inline">{user.email}</span>
      <CerrarSesionButton />
    </div>
  );
}
