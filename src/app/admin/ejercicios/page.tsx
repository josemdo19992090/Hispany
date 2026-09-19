import { getNiveles, getSeccionesPorNivel, getClasesPorSeccion } from "@/lib/data";
import EjerciciosAdmin from "@/components/admin/EjerciciosAdmin";

export default async function AdminEjerciciosPage() {
  const niveles = await getNiveles();
  const secciones = (
    await Promise.all(niveles.map((n) => getSeccionesPorNivel(n.id)))
  ).flat();
  const clases = (
    await Promise.all(secciones.map((s) => getClasesPorSeccion(s.id)))
  ).flat();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-extrabold">Ejercicios</h1>
      <EjerciciosAdmin niveles={niveles} secciones={secciones} clases={clases} />
    </div>
  );
}
