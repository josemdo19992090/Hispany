"use client";

import { useState } from "react";
import type { Ejercicio } from "@/types/content";
import { registrarIntentoPrueba } from "@/lib/progreso";
import ExercisePlayer from "./ExercisePlayer";

export default function PruebaExercisePlayer({
  ejercicios,
  seccionId,
  nivelId,
}: {
  ejercicios: Ejercicio[];
  seccionId?: string;
  nivelId?: string;
}) {
  const [estado, setEstado] = useState<
    | { tipo: "esperando" }
    | { tipo: "sin_sesion" }
    | { tipo: "resultado"; aprobado: boolean }
  >({ tipo: "esperando" });

  const handleTerminar = async ({ porcentaje }: { porcentaje: number }) => {
    const resultado = await registrarIntentoPrueba({ seccionId, nivelId, puntaje: porcentaje });
    if (!resultado.guardado) {
      setEstado({ tipo: "sin_sesion" });
    } else {
      setEstado({ tipo: "resultado", aprobado: resultado.aprobado });
    }
  };

  return (
    <div>
      <ExercisePlayer ejercicios={ejercicios} onTerminar={handleTerminar} />
      {estado.tipo === "sin_sesion" && (
        <p className="mt-3 text-center text-sm font-semibold text-chigui-brown">
          Inicia sesión para que este intento quede registrado.
        </p>
      )}
      {estado.tipo === "resultado" && (
        <p
          className={`mt-3 text-center text-sm font-semibold ${
            estado.aprobado ? "text-brand-green" : "text-red-700"
          }`}
        >
          {estado.aprobado
            ? seccionId
              ? "¡Intento aprobado! Subió tu contador de repeticiones aprobadas."
              : "¡Aprobaste la prueba final de nivel! 🎉"
            : "Necesitas al menos 60% para aprobar. ¡Sigue practicando y vuelve a intentar!"}
        </p>
      )}
    </div>
  );
}
