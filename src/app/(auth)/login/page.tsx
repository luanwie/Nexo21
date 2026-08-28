import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Ingresar",
  description: "Ingresa a tu cuenta de Nexo 21.",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Bienvenido de nuevo"
      title="Ingresa a tu cuenta"
      description="Continúa tu recorrido personal y vuelve al espacio que estás cuidando para ti."
    >
      <LoginForm />
    </AuthShell>
  );
}
