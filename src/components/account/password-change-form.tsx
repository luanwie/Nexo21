"use client";

import { KeyRound, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { getAuthError } from "@/components/auth/form-controls";
import { authClient } from "@/lib/auth-client";
import { AccountFeedback } from "./account-feedback";
import { validatePasswordChange } from "./password-validation";

export function PasswordChangeForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      currentPassword: String(data.get("currentPassword") ?? ""),
      newPassword: String(data.get("newPassword") ?? ""),
      confirmation: String(data.get("passwordConfirmation") ?? ""),
    };
    const validation = validatePasswordChange(values);

    setError(null);
    setSuccess(null);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        setError(
          getAuthError(
            result.error,
            "No pudimos cambiar tu contraseña. Revisa tu contraseña actual e inténtalo de nuevo.",
          ),
        );
        return;
      }

      form.reset();
      setSuccess("Contraseña actualizada. También cerramos tus otras sesiones.");
    } catch {
      setError("No pudimos cambiar tu contraseña. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="app-card p-6" aria-busy={loading}>
      <h2 className="flex items-center gap-2 font-semibold">
        <KeyRound size={18} className="text-[#B85C42]" aria-hidden="true" />
        Cambiar contraseña
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Al guardar, mantendremos esta sesión y cerraremos las demás para proteger tu cuenta.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label className="label" htmlFor="current-password">Contraseña actual</label>
          <input
            id="current-password"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            className="field"
            required
            maxLength={128}
            disabled={loading}
          />
        </div>
        <div>
          <label className="label" htmlFor="new-password">Nueva contraseña</label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            className="field"
            aria-describedby="new-password-hint"
            required
            minLength={8}
            maxLength={128}
            disabled={loading}
          />
          <p id="new-password-hint" className="mt-1.5 text-xs text-muted">
            Usa entre 8 y 128 caracteres.
          </p>
        </div>
        <div>
          <label className="label" htmlFor="password-confirmation">Confirmar nueva contraseña</label>
          <input
            id="password-confirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            className="field"
            required
            minLength={8}
            maxLength={128}
            disabled={loading}
          />
        </div>
      </div>

      {error ? <AccountFeedback kind="error">{error}</AccountFeedback> : null}
      {success ? <AccountFeedback kind="success">{success}</AccountFeedback> : null}

      <button type="submit" className="primary-button mt-5 w-fit" disabled={loading}>
        {loading ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : null}
        {loading ? "Cambiando contraseña..." : "Cambiar contraseña"}
      </button>
    </form>
  );
}
