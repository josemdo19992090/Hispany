import { getNiveles, getSeccionesPorNivel, getClasesPorSeccion } from "@/lib/data";
import GenerarIA from "@/components/admin/GenerarIA";

export default async function AdminIAPage() {
  const niveles = await getNiveles();
  const secciones = (await Promise.all(niveles.map((n) => getSeccionesPorNivel(n.id)))).flat();
  const clases = (await Promise.all(secciones.map((s) => getClasesPorSeccion(s.id)))).flat();

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Generar con IA</h1>
      <p className="mb-4 text-chigui-brown">
        Elige un ejercicio existente como base, genera una variante con IA, revísala y edítala si
        hace falta, y publícala solo si te convence.
      </p>
      <GenerarIA niveles={niveles} secciones={secciones} clases={clases} />
    </div>
  );
}
