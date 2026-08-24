"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { requestPasswordReset } from "@/lib/auth-client";
import { AuthButton, AuthFeedback, AuthField, getAuthError } from "./form-controls";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setLoading(true);
    setError(null);

    try {
      const result = await requestPasswordReset({
        email: String(data.get("email") ?? "").trim(),
        redirectTo: "/restablecer-clave",
      });

      if (result.error) {
        setError(getAuthError(result.error, "No pudimos enviar el enlace. Inténtalo de nuevo."));
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setError("No pudimos conectar con el servidor. Inténtalo de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="space-y-5">
        <AuthFeedback kind="success">
          Si el correo está registrado, recibirás un enlace para crear una nueva contraseña. Revisa también la carpeta de spam.
        </AuthFeedback>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="w-full rounded-xl border border-[#314b3f]/20 bg-white px-4 py-3 text-sm font-bold text-[#314b3f] outline-none transition hover:bg-[#f7f4ed] focus-visible:ring-2 focus-visible:ring-[#51705f] focus-visible:ring-offset-2"
        >
          Enviar otro enlace
        </button>
        <p className="text-center text-sm">
          <Link
            href="/login"
            className="font-bold text-[#426451] underline decoration-[#426451]/35 underline-offset-4 hover:text-[#263d32] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51705f]"
          >
            Volver a ingresar
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error ? <AuthFeedback kind="error">{error}</AuthFeedback> : null}

      <AuthField
        label="Correo electrónico"
        hint="Te enviaremos un enlace seguro si encontramos una cuenta asociada."
        id="forgot-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        required
        disabled={loading}
      />

      <AuthButton loading={loading} loadingLabel="Enviando enlace...">
        Enviar enlace de recuperación
      </AuthButton>

      <p className="text-center text-sm">
        <Link
          href="/login"
          className="font-bold text-[#426451] underline decoration-[#426451]/35 underline-offset-4 hover:text-[#263d32] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51705f]"
        >
          Volver a ingresar
        </Link>
      </p>
    </form>
  );
}
