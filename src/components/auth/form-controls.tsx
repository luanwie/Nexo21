import type { InputHTMLAttributes, ReactNode } from "react";

type AuthFieldProps = {
  label: string;
  hint?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;

export function AuthField({ label, hint, id, ...props }: AuthFieldProps) {
  const fieldId = id ?? props.name;
  const hintId = hint && fieldId ? `${fieldId}-hint` : undefined;

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-2 block text-sm font-semibold text-[#31443a]">{label}</span>
      <input
        {...props}
        id={fieldId}
        aria-describedby={hintId}
        className="w-full rounded-xl border border-[#314b3f]/20 bg-white px-4 py-3 text-base text-[#24372e] shadow-sm outline-none transition placeholder:text-[#9aa39e] hover:border-[#314b3f]/35 focus:border-[#51705f] focus:ring-4 focus:ring-[#51705f]/15 disabled:cursor-not-allowed disabled:bg-[#f1eee7]"
      />
      {hint ? (
        <span id={hintId} className="mt-1.5 block text-xs leading-5 text-[#737d77]">
          {hint}
        </span>
      ) : null}
    </label>
  );
}

type AuthButtonProps = {
  children: ReactNode;
  loading?: boolean;
  loadingLabel?: string;
};

export function AuthButton({ children, loading = false, loadingLabel = "Procesando..." }: AuthButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#314b3f] px-4 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-12px_rgba(49,75,63,0.9)] outline-none transition hover:bg-[#263d32] focus-visible:ring-2 focus-visible:ring-[#51705f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-65"
    >
      {loading ? (
        <>
          <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />
          {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

type AuthFeedbackProps = {
  kind: "error" | "success";
  children: ReactNode;
};

export function AuthFeedback({ kind, children }: AuthFeedbackProps) {
  const isError = kind === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={`rounded-xl border px-4 py-3 text-sm leading-5 ${
        isError
          ? "border-[#b74f4f]/20 bg-[#fff0ed] text-[#8d3434]"
          : "border-[#41745a]/20 bg-[#edf7f0] text-[#315f48]"
      }`}
    >
      {children}
    </div>
  );
}

type AuthError = {
  code?: string;
  message?: string;
};

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "El correo o la contraseña no son correctos.",
  INVALID_PASSWORD: "La contraseña no es correcta.",
  INVALID_EMAIL: "Ingresa un correo electrónico válido.",
  USER_ALREADY_EXISTS: "Ya existe una cuenta con este correo.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Ya existe una cuenta con este correo. Prueba con otro.",
  PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres.",
  PASSWORD_TOO_LONG: "La contraseña no puede superar los 128 caracteres.",
  INVALID_TOKEN: "Este enlace de recuperación no es válido o ya venció.",
  TOKEN_EXPIRED: "Este enlace de recuperación ya venció. Solicita uno nuevo.",
};

export function getAuthError(error: unknown, fallback: string) {
  if (!error || typeof error !== "object") return fallback;

  const { code, message } = error as AuthError;
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];

  if (message) {
    const normalizedMessage = message.toUpperCase().replaceAll(" ", "_").replaceAll(".", "");
    if (ERROR_MESSAGES[normalizedMessage]) return ERROR_MESSAGES[normalizedMessage];
  }

  return fallback;
}
