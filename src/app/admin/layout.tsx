import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUsuarioActual } from "@/lib/data";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/");

  const usuario = await getUsuarioActual(supabase);
  if (!usuario || usuario.rol !== "admin") redirect("/");

  return (
    <div>
      <nav className="mb-6 flex flex-wrap gap-2 rounded-xl2 border-2 border-chigui-tan bg-white p-3">
        <Link href="/admin" className="rounded-full px-3 py-1 text-sm font-bold hover:bg-chigui-cream">
          Panel
        </Link>
        <Link
          href="/admin/ejercicios"
          className="rounded-full px-3 py-1 text-sm font-bold hover:bg-chigui-cream"
        >
          Ejercicios
        </Link>
        <Link
          href="/admin/ia"
          className="rounded-full px-3 py-1 text-sm font-bold hover:bg-chigui-cream"
        >
          Generar con IA
        </Link>
        <Link
          href="/admin/reportes"
          className="rounded-full px-3 py-1 text-sm font-bold hover:bg-chigui-cream"
        >
          Reportes
        </Link>
      </nav>
      {children}
    </div>
  );
}
