import Link from "next/link";
import { CheckCircle2, CircleDollarSign, LockKeyhole, PackageCheck, Sparkles } from "lucide-react";
import { listEntitlements } from "@/lib/access";
import { getCheckoutReadiness } from "@/lib/checkout-readiness";
import { OFFERS } from "@/lib/offers";
import { requireUser } from "@/lib/session";

const typeLabels = {
  MAIN: "Jornada principal",
  BUMP: "Complemento",
  UPSELL: "Experiencia premium",
  DLC: "Módulo independiente",
  SUBSCRIPTION: "Membresía mensual",
} as const;

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ bloqueado?: string }>;
}) {
  const user = await requireUser();
  const entitlements = await listEntitlements(user);
  const owned = new Set(entitlements.map((item) => item.product.slug));
  const { bloqueado } = await searchParams;
  const readiness = new Map(await Promise.all(OFFERS.map(async (offer) => [offer.slug, await getCheckoutReadiness(offer.slug)] as const)));

  return <div className="space-y-7">
    <header>
      <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#934731]">Tienda Nexo 21</p>
      <h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Experiencias completas para distintos momentos.</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Cada producto tiene contenido propio y acceso independiente. El botón de compra aparece solamente cuando su checkout Hotmart y la entrega automática están configurados.</p>
    </header>

    {bloqueado ? <div className="rounded-2xl border border-[#e3c7bd] bg-[#fff8f4] p-5">
      <p className="flex items-center gap-2 font-semibold text-[#934731]"><LockKeyhole size={18} /> Este contenido todavía no está habilitado en tu cuenta.</p>
      <p className="mt-2 text-sm text-muted">Confirma que ingresaste con el mismo correo verificado de la compra o revisa la oferta correspondiente.</p>
    </div> : null}

    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {OFFERS.map((offer) => {
        const hasAccess = owned.has(offer.slug) || user.role === "ADMIN";
        const readyToSell = readiness.get(offer.slug)?.ready === true;
        const accessHref = offer.type === "MAIN" ? "/app" : `/app/extras/${offer.slug}`;
        return <article key={offer.slug} className="app-card flex flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <span className="pill bg-[#f4eee4] text-muted">{typeLabels[offer.type]}</span>
            {hasAccess ? <PackageCheck size={20} className="text-[#547055]" /> : <Sparkles size={20} className="text-[#B85C42]" />}
          </div>
          <h2 className="editorial-title mt-5 text-3xl">{offer.shortTitle}</h2>
          <p className="mt-3 flex-1 text-sm leading-6 text-muted">{offer.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-muted">
            {offer.features.map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#547055]" />{feature}</li>)}
          </ul>
          <div className="mt-6 border-t border-[#eee6db] pt-5">
            <p className="text-2xl font-semibold">US${(offer.priceCents / 100).toFixed(2)}{offer.type === "SUBSCRIPTION" ? <span className="text-sm font-normal text-muted">/mes</span> : null}</p>
            {hasAccess
              ? <Link href={accessHref} className="primary-button mt-4 w-full">Abrir contenido</Link>
              : readyToSell
                ? <Link href={`/checkout?product=${offer.slug}`} className="primary-button mt-4 w-full"><CircleDollarSign size={17} /> Comprar</Link>
                : <p className="mt-4 rounded-xl bg-[#f4eee4] px-4 py-3 text-center text-xs font-semibold text-muted">{offer.type === "SUBSCRIPTION" ? "Mes 1 disponible · venta recurrente aún protegida" : "Disponible · conecta checkout, HOTTOK y mapeo Hotmart"}</p>}
          </div>
        </article>;
      })}
    </section>
  </div>;
}