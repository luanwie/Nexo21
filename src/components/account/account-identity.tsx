import { BadgeCheck, Mail, ShieldAlert } from "lucide-react";

type AccountIdentityProps = {
  email: string;
  emailVerified: boolean;
};

export function AccountIdentity({ email, emailVerified }: AccountIdentityProps) {
  return (
    <section className="app-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between" aria-labelledby="account-email-title">
      <div>
        <h2 id="account-email-title" className="flex items-center gap-2 font-semibold">
          <Mail size={18} className="text-[#B85C42]" aria-hidden="true" />
          Correo de la cuenta
        </h2>
        <p className="mt-2 break-all text-sm text-muted">{email}</p>
      </div>
      <p
        className={`pill w-fit ${
          emailVerified
            ? "bg-[#e7f2e9] text-[#3f654a]"
            : "bg-[#fff0e5] text-[#925239]"
        }`}
      >
        {emailVerified ? (
          <BadgeCheck size={16} aria-hidden="true" />
        ) : (
          <ShieldAlert size={16} aria-hidden="true" />
        )}
        {emailVerified ? "Correo verificado" : "Correo pendiente de verificación"}
      </p>
    </section>
  );
}
