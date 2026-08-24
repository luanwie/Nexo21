"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { AccountFeedback } from "./account-feedback";

export function ProfileForm({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await authClient.updateUser({ name: name.trim() });

      if (result.error) {
        setError(result.error.message ?? "No fue posible actualizar tu nombre.");
        return;
      }

      setSuccess("Nombre actualizado.");
      router.refresh();
    } catch {
      setError("No fue posible actualizar tu nombre. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="app-card p-6" aria-busy={loading}>
      <h2 className="font-semibold">Perfil</h2>
      <div className="mt-4">
        <label className="label" htmlFor="profile-name">Nombre</label>
        <input
          id="profile-name"
          className="field"
          value={name}
          onChange={(event) => setName(event.target.value)}
          minLength={2}
          maxLength={80}
          required
          disabled={loading}
        />
      </div>
      {error ? <AccountFeedback kind="error">{error}</AccountFeedback> : null}
      {success ? <AccountFeedback kind="success">{success}</AccountFeedback> : null}
      <button type="submit" className="primary-button mt-5 w-fit" disabled={loading}>
        {loading ? (
          <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        ) : (
          <Save size={16} aria-hidden="true" />
        )}
        {loading ? "Guardando..." : "Guardar nombre"}
      </button>
    </form>
  );
}
