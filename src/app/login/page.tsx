"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import Boton from "@/components/ui/Boton";
import Texto from "@/components/ui/Texto";
import { ui } from "@/lib/i18n/diccionario";
import { useIdioma } from "@/lib/i18n/context";
import type { PerfilAlumno } from "@/types/content";

export default function LoginPage() {
  const { idioma } = useIdioma();
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [perfil, setPerfil] = useState<PerfilAlumno>("trabajo_viajes");
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
        setError(ui.correoOContrasenaIncorrectos[idioma]);
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nombre: nombre || email.split("@")[0], perfil } },
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
      <h1 className="mb-4 text-center text-xl font-extrabold">
        <Texto
          clave={modo === "login" ? "bienvenidoDeVuelta" : "creaTuCuentaGratis"}
        />
      </h1>

      <div className="mb-6 flex rounded-full bg-white p-1 shadow-soft">
        <button
          type="button"
          onClick={() => setModo("login")}
          aria-pressed={modo === "login"}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
            modo === "login"
              ? "bg-brand-green text-white"
              : "text-chigui-brown hover:text-chigui-brown-dark"
          }`}
        >
          <Texto clave="iniciarSesion" />
        </button>
        <button
          type="button"
          onClick={() => setModo("registro")}
          aria-pressed={modo === "registro"}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-bold transition-all ${
            modo === "registro"
              ? "bg-brand-green text-white"
              : "text-chigui-brown hover:text-chigui-brown-dark"
          }`}
        >
          <Texto clave="crearCuenta" />
        </button>
      </div>

      <form
        key={modo}
        onSubmit={enviar}
        className="flex flex-col gap-3 rounded-card bg-white p-5 shadow-soft"
      >
        {modo === "registro" && (
          <>
            <label className="flex flex-col gap-1 text-sm font-semibold">
              <Texto clave="nombre" />
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="rounded-field bg-chigui-cream px-3 py-2 font-normal text-chigui-brown-dark"
              />
            </label>

            <div className="flex flex-col gap-1 text-sm font-semibold">
              <Texto clave="paraQuienEsLaCuenta" />
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-pressed={perfil === "ninos"}
                  onClick={() => setPerfil("ninos")}
                  className={`flex-1 rounded-field px-3 py-2 text-sm font-bold transition ${
                    perfil === "ninos"
                      ? "bg-brand-green text-white"
                      : "bg-chigui-cream text-chigui-brown-dark"
                  }`}
                >
                  {ui.perfilNinos[idioma]}
                </button>
                <button
                  type="button"
                  aria-pressed={perfil === "trabajo_viajes"}
                  onClick={() => setPerfil("trabajo_viajes")}
                  className={`flex-1 rounded-field px-3 py-2 text-sm font-bold transition ${
                    perfil === "trabajo_viajes"
                      ? "bg-brand-green text-white"
                      : "bg-chigui-cream text-chigui-brown-dark"
                  }`}
                >
                  {ui.perfilTrabajoViajes[idioma]}
                </button>
              </div>
            </div>
          </>
        )}
        <label className="flex flex-col gap-1 text-sm font-semibold">
          <Texto clave="correo" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-field bg-chigui-cream px-3 py-2 font-normal text-chigui-brown-dark"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold">
          <Texto clave="contrasena" />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-field bg-chigui-cream px-3 py-2 font-normal text-chigui-brown-dark"
          />
        </label>

        {error && <p className="text-sm text-brand-red">{error}</p>}
        {avisoRegistro && (
          <p className="text-sm text-brand-green">{ui.cuentaCreadaRevisaCorreo[idioma]}</p>
        )}

        <Boton type="submit" disabled={cargando} className="mt-2">
          <Texto clave={modo === "login" ? "entrar" : "crearCuenta"} />
        </Boton>
      </form>

      <Link
        href="/"
        className="mt-4 flex items-center justify-center gap-1 text-center text-sm font-semibold text-brand-blue"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {ui.seguirSinCuenta[idioma]}
      </Link>
    </div>
  );
}
