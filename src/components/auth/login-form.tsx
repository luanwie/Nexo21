"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn } from "@/lib/auth-client";
import { AuthButton, AuthFeedback, AuthField, getAuthError } from "./form-controls";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await signIn.email({
        email: String(data.get("email") ?? "").trim(),
        password: String(data.get("password") ?? ""),
      });

      if (result.error) {
        setError(getAuthError(result.error, "No pudimos iniciar sesión. Revisa tus datos e inténtalo de nuevo."));
        return;
      }

      setSuccess("Sesión iniciada. Te llevamos a tu recorrido...");
      router.replace("/app");
      router.refresh();
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
        label="Correo electrónico"
        id="login-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        required
        disabled={loading}
      />

      <div>
        <AuthField
          label="Contraseña"
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Tu contraseña"
          required
          minLength={8}
          maxLength={128}
          disabled={loading}
        />
        <div className="mt-2 text-right">
          <Link
            href="/olvide-mi-clave"
            className="text-sm font-semibold text-[#426451] underline decoration-[#426451]/35 underline-offset-4 transition hover:text-[#263d32] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51705f]"
          >
            Olvidé mi contraseña
          </Link>
        </div>
      </div>

      <AuthButton loading={loading} loadingLabel="Ingresando...">
        Ingresar
      </AuthButton>

      <p className="text-center text-sm text-[#69736d]">
        ¿Todavía no tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-bold text-[#426451] underline decoration-[#426451]/35 underline-offset-4 hover:text-[#263d32] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51705f]"
        >
          Crear cuenta
        </Link>
      </p>
    </form>
  );
}
