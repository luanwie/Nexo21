"use client";

import { Laptop, Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AccountFeedback } from "./account-feedback";

export function OtherSessionsCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function revokeOtherSessions() {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await authClient.revokeOtherSessions();

      if (result.error) {
        setError("No pudimos cerrar las otras sesiones. Inténtalo de nuevo.");
        return;
      }

      setSuccess("Las otras sesiones se cerraron. Esta sesión sigue activa.");
    } catch {
      setError("No pudimos cerrar las otras sesiones. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="app-card p-6" aria-labelledby="other-sessions-title" aria-busy={loading}>
      <h2 id="other-sessions-title" className="flex items-center gap-2 font-semibold">
        <Laptop size={18} className="text-[#74836B]" aria-hidden="true" />
        Sesiones abiertas
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Si usaste Nexo 21 en otro dispositivo, puedes cerrar todas las sesiones excepto esta.
      </p>

      {error ? <AccountFeedback kind="error">{error}</AccountFeedback> : null}
      {success ? <AccountFeedback kind="success">{success}</AccountFeedback> : null}

      <button
        type="button"
        className="secondary-button mt-5 gap-2"
        disabled={loading}
        onClick={revokeOtherSessions}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <LogOut size={16} aria-hidden="true" />
        )}
        {loading ? "Cerrando sesiones..." : "Cerrar las otras sesiones"}
      </button>
    </section>
  );
}
