import { AccountIdentity } from "@/components/account/account-identity";
import { AccountProducts } from "@/components/account/account-products";
import { OtherSessionsCard } from "@/components/account/other-sessions-card";
import { PasswordChangeForm } from "@/components/account/password-change-form";
import { ProfileForm } from "@/components/account/profile-form";
import { listEntitlements } from "@/lib/access";
import { requireUser } from "@/lib/session";

export default async function AccountPage() {
  const user = await requireUser();
  const entitlements = await listEntitlements(user);
  const products = entitlements.map((entitlement) => ({
    id: entitlement.id,
    title: entitlement.product.title,
    grantedAt: entitlement.grantedAt,
  }));

  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Mi cuenta</p>
        <h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Tu perfil y tus accesos.</h1>
        <p className="mt-3 text-muted">Administra tus datos y protege el acceso a tu cuenta.</p>
      </header>

      <AccountIdentity email={user.email} emailVerified={user.emailVerified} />

      <div className="grid items-start gap-5 md:grid-cols-2">
        <ProfileForm initialName={user.name} />
        <PasswordChangeForm />
      </div>

      <OtherSessionsCard />
      <AccountProducts products={products} />
    </div>
  );
}
