import { createSupabaseServerClient } from "@/lib/supabase/server";
import ReportesAdmin from "@/components/admin/ReportesAdmin";

export default async function AdminReportesPage() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = supabase
    ? await supabase
        .from("reportes_ejercicio")
        .select("*, ejercicios(tipo, contenido)")
        .order("created_at", { ascending: false })
    : { data: [], error: null };
  if (error) throw error;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold">Reportes de errores</h1>
      <ReportesAdmin reportesIniciales={data ?? []} />
    </div>
  );
}
