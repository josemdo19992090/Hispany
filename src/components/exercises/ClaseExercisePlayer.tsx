"use client";

import { useState } from "react";
import type { Ejercicio } from "@/types/content";
import { marcarClaseCompletada } from "@/lib/progreso";
import ExercisePlayer from "./ExercisePlayer";

export default function ClaseExercisePlayer({
  claseId,
  seccionId,
  ejercicios,
}: {
  claseId: string;
  seccionId: string;
  ejercicios: Ejercicio[];
}) {
  const [aviso, setAviso] = useState<string | null>(null);

  const handleTerminar = async () => {
    const resultado = await marcarClaseCompletada(claseId, seccionId);
    if (!resultado.guardado) {
      setAviso("Inicia sesión para guardar tu progreso en esta clase.");
    } else if (resultado.seccionPasada) {
      setAviso("¡Completaste todas las clases de esta sección! 🎉");
    } else {
      setAviso("Progreso guardado.");
    }
  };

  return (
    <div>
      <ExercisePlayer ejercicios={ejercicios} onTerminar={handleTerminar} />
      {aviso && <p className="mt-3 text-center text-sm font-semibold text-chigui-brown">{aviso}</p>}
    </div>
  );
}
