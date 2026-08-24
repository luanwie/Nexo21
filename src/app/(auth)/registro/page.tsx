import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: "Crea tu cuenta de Nexo 21.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Comienza hoy"
      title="Crea tu cuenta"
      description="Guarda tu avance y recorre los 21 días a tu propio ritmo."
    >
      <RegisterForm />
    </AuthShell>
  );
}
