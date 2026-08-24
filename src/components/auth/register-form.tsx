"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { signUp } from "@/lib/auth-client";
import { AuthButton, AuthFeedback, AuthField, getAuthError } from "./form-controls";

export function RegisterForm() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (name.length < 2) {
      setError("Escribe tu nombre para crear la cuenta.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signUp.email({ name, email, password, callbackURL: "/login?verified=1" });

      if (result.error) {
        setError(getAuthError(result.error, "No pudimos crear tu cuenta. Revisa los datos e inténtalo de nuevo."));
        return;
      }

      setSuccess("Revisa tu correo y confirma el enlace antes de ingresar. Así protegemos tus compras y tu diario privado.");
    } catch {
      setError("No pudimos conectar con el servidor. Inténtalo de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error ? <AuthFeedback kind="error">{error}</AuthFeedback> : null}
      {success ? <AuthFeedback kind="success">{success}</AuthFeedback> : null}

      <AuthField
        label="Nombre"
        id="register-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Cómo quieres que te llamemos"
        required
        minLength={2}
        maxLength={80}
        disabled={loading}
      />

      <AuthField
        label="Correo electrónico"
        id="register-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        required
        disabled={loading}
      />

      <AuthField
        label="Contraseña"
        hint="Usa entre 8 y 128 caracteres."
        id="register-password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Crea una contraseña segura"
        required
        minLength={8}
        maxLength={128}
        disabled={loading}
      />

      <AuthButton loading={loading} loadingLabel="Creando tu cuenta...">
        Crear mi cuenta
      </AuthButton>

      <p className="text-center text-sm text-[#69736d]">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-bold text-[#426451] underline decoration-[#426451]/35 underline-offset-4 hover:text-[#263d32] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51705f]"
        >
          Ingresar
        </Link>
      </p>
    </form>
  );
}
