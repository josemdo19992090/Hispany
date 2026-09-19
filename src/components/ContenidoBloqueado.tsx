export default function ContenidoBloqueado({ mensaje }: { mensaje: string }) {
  return (
    <div className="rounded-xl2 border-2 border-dashed border-chigui-brown-dark bg-white p-6 text-center">
      <p className="mb-2 text-3xl">🔒</p>
      <p className="mb-1 font-bold">Contenido premium</p>
      <p className="text-sm text-chigui-brown">{mensaje}</p>
    </div>
  );
}
