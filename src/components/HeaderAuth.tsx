import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden text-chigui-brown sm:inline">{user.email}</span>
      <CerrarSesionButton />
    </div>
  );
}
