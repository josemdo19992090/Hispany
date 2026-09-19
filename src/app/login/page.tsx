"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avisoRegistro, setAvisoRegistro] = useState(false);
  const router = useRouter();

  const supabase = createSupabaseBrowserClient();

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setCargando(true);
    setError(null);
    setAvisoRegistro(false);

    if (modo === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Correo o contraseña incorrectos.");
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre: nombre || email.split("@")[0] } },
      });
      if (error) {
        setError(error.message);
      } else {
        setAvisoRegistro(true);
      }
    }
    setCargando(false);
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-6 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setModo("login")}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            modo === "login" ? "bg-brand-green text-white" : "border-2 border-chigui-tan bg-white"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          type="button"
          onClick={() => setModo("registro")}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            modo === "registro"
              ? "bg-brand-green text-white"
              : "border-2 border-chigui-tan bg-white"
          }`}
        >
          Crear cuenta
        </button>
      </div>

      <form onSubmit={enviar} className="flex flex-col gap-3 rounded-xl2 bg-white p-5 shadow-sm">
        {modo === "registro" && (
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Nombre
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="rounded-lg border-2 border-chigui-tan px-3 py-2 font-normal focus:border-brand-green focus:outline-none"
            />
          </label>
        )}
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Correo
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border-2 border-chigui-tan px-3 py-2 font-normal focus:border-brand-green focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Contraseña
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border-2 border-chigui-tan px-3 py-2 font-normal focus:border-brand-green focus:outline-none"
          />
        </label>

        {error && <p className="text-sm text-red-700">{error}</p>}
        {avisoRegistro && (
          <p className="text-sm text-brand-green">
            ¡Cuenta creada! Revisa tu correo para confirmarla y luego inicia sesión.
          </p>
        )}

        <button
          type="submit"
          disabled={cargando}
          className="mt-2 rounded-full bg-brand-green px-6 py-2 font-bold text-white disabled:opacity-50"
        >
          {modo === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>

      <Link href="/" className="mt-4 block text-center text-sm font-semibold text-brand-blue">
        &larr; Seguir explorando sin cuenta
      </Link>
    </div>
  );
}
