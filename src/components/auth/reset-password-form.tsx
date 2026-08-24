"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { resetPassword } from "@/lib/auth-client";
import { AuthButton, AuthFeedback, AuthField, getAuthError } from "./form-controls";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const tokenError = searchParams.get("error");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const password = String(data.get("password") ?? "");
    const confirmation = String(data.get("passwordConfirmation") ?? "");

    if (!token) {
      setError("Este enlace de recuperación no es válido o ya venció.");
      return;
    }

    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await resetPassword({ newPassword: password, token });

      if (result.error) {
        setError(getAuthError(result.error, "No pudimos cambiar tu contraseña. Solicita un nuevo enlace e inténtalo otra vez."));
        return;
      }

      setSuccess(true);
      form.reset();
    } catch {
      setError("No pudimos conectar con el servidor. Inténtalo de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-5">
        <AuthFeedback kind="success">Tu contraseña fue actualizada. Ya puedes ingresar con ella.</AuthFeedback>
        <Link
          href="/login"
          className="flex w-full items-center justify-center rounded-xl bg-[#314b3f] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(49,75,63,0.9)] outline-none transition hover:bg-[#263d32] focus-visible:ring-2 focus-visible:ring-[#51705f] focus-visible:ring-offset-2"
        >
          Ingresar a Nexo 21
        </Link>
      </div>
    );
  }

  if (!token || tokenError) {
    return (
      <div className="space-y-5">
        <AuthFeedback kind="error">
          {tokenError === "TOKEN_EXPIRED"
            ? "Este enlace de recuperación ya venció. Solicita uno nuevo."
            : "Este enlace de recuperación no es válido o ya venció."}
        </AuthFeedback>
        <Link
          href="/olvide-mi-clave"
          className="flex w-full items-center justify-center rounded-xl bg-[#314b3f] px-4 py-3.5 text-sm font-bold text-white outline-none transition hover:bg-[#263d32] focus-visible:ring-2 focus-visible:ring-[#51705f] focus-visible:ring-offset-2"
        >
          Solicitar un nuevo enlace
        </Link>
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
        label="Nueva contraseña"
        hint="Usa entre 8 y 128 caracteres."
        id="reset-password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Crea una contraseña segura"
        required
        minLength={8}
        maxLength={128}
        disabled={loading}
      />

      <AuthField
        label="Confirmar contraseña"
        id="reset-password-confirmation"
        name="passwordConfirmation"
        type="password"
        autoComplete="new-password"
        placeholder="Repite la nueva contraseña"
        required
        minLength={8}
        maxLength={128}
        disabled={loading}
      />

      <AuthButton loading={loading} loadingLabel="Guardando contraseña...">
        Guardar nueva contraseña
      </AuthButton>
    </form>
  );
}
