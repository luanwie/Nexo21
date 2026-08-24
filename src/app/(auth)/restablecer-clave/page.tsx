import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  description: "Crea una nueva contraseña para tu cuenta de Nexo 21.",
};

function ResetFormFallback() {
  return (
    <div role="status" className="flex items-center justify-center gap-2 py-8 text-sm text-[#647169]">
      <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-[#51705f]/25 border-t-[#51705f]" />
      Preparando enlace seguro...
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="Protege tu cuenta"
      title="Crea una nueva contraseña"
      description="Elige una contraseña segura que puedas recordar."
    >
      <Suspense fallback={<ResetFormFallback />}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
