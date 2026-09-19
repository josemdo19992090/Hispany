import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Link
        href="/admin/ejercicios"
        className="rounded-xl2 border-2 border-chigui-tan bg-white p-5 shadow-sm hover:border-brand-green"
      >
        <p className="mb-1 text-2xl">📝</p>
        <p className="font-bold">Ejercicios</p>
        <p className="text-sm text-chigui-brown">Crear, editar y borrar ejercicios manualmente.</p>
      </Link>
      <Link
        href="/admin/ia"
        className="rounded-xl2 border-2 border-chigui-tan bg-white p-5 shadow-sm hover:border-brand-green"
      >
        <p className="mb-1 text-2xl">✨</p>
        <p className="font-bold">Generar con IA</p>
        <p className="text-sm text-chigui-brown">
          Genera una variante a partir de un ejercicio existente, revísala y publícala.
        </p>
      </Link>
      <Link
        href="/admin/reportes"
        className="rounded-xl2 border-2 border-chigui-tan bg-white p-5 shadow-sm hover:border-brand-green"
      >
        <p className="mb-1 text-2xl">⚠️</p>
        <p className="font-bold">Reportes</p>
        <p className="text-sm text-chigui-brown">Errores que los estudiantes reportaron.</p>
      </Link>
    </div>
  );
}
