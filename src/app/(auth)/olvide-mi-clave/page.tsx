import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  description: "Solicita un enlace para recuperar tu contraseña de Nexo 21.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Recupera tu acceso"
      title="¿Olvidaste tu contraseña?"
      description="Escribe tu correo y te ayudaremos a volver a tu recorrido."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
