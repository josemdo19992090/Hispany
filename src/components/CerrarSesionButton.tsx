"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import Texto from "@/components/ui/Texto";

export default function CerrarSesionButton() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const salir = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={salir}
      className="rounded-full border-2 border-chigui-tan px-3 py-1 font-semibold text-chigui-brown hover:border-brand-red hover:text-brand-red"
    >
      <Texto clave="salir" />
    </button>
  );
}
