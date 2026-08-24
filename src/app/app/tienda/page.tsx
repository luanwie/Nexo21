import Link from "next/link";
import { CheckCircle2, Clock3, LockKeyhole, Sparkles } from "lucide-react";
import { listEntitlements } from "@/lib/access";
import { OFFERS, getOffer } from "@/lib/offers";
import { requireUser } from "@/lib/session";

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ bloqueado?: string }>;
}) {
  const user = await requireUser();
  const entitlements = await listEntitlements(user);
  const owned = new Set(entitlements.map((item) => item.product.slug));
  const { bloqueado } = await searchParams;
  const main = getOffer("nexo-21")!;
  const future = OFFERS.filter((item) => item.type === "DLC" || item.type === "UPSELL" || item.type === "SUBSCRIPTION");

  return <div className="space-y-7">
    <header>
      <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#934731]">Tu biblioteca</p>
      <h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Lo que tienes hoy y lo que estamos preparando.</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Solo mostramos un botón de compra cuando una experiencia está completa y disponible. Nada futuro se cobra por adelantado.</p>
    </header>

    {bloqueado ? <div className="rounded-2xl border border-[#e3c7bd] bg-[#fff8f4] p-5">
      <p className="flex items-center gap-2 font-semibold text-[#934731]"><LockKeyhole size={18} /> Este contenido todavía no está habilitado en tu cuenta.</p>
      <p className="mt-2 text-sm text-muted">Confirma que ingresaste con el mismo correo verificado de la compra o revisa la oferta disponible.</p>
    </div> : null}

    <section className="app-card p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#547055]">Disponible ahora</p>
          <h2 className="editorial-title mt-2 text-3xl">{main.shortTitle}</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted">{main.description}</p>
          <ul className="mt-4 grid gap-2 text-sm text-muted sm:grid-cols-2">
            {main.features.map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 size={16} className="mt-0.5 text-[#547055]" />{feature}</li>)}
          </ul>
        </div>
        {owned.has(main.slug) || user.role === "ADMIN"
          ? <Link href="/app" className="primary-button shrink-0">Abrir Nexo 21</Link>
          : <Link href="/checkout?product=nexo-21" className="primary-button shrink-0">Ver oferta · US$9.90</Link>}
      </div>
    </section>

    <section>
      <div className="flex items-center gap-2"><Sparkles size={18} className="text-[#934731]" /><h2 className="editorial-title text-2xl">Próximas experiencias</h2></div>
      <p className="mt-2 text-sm text-muted">Son posibilidades de expansión, no productos disponibles para compra.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {future.slice(0, 6).map((item) => <article key={item.slug} className="app-card p-5 opacity-80">
          <span className="pill inline-flex items-center gap-1 bg-[#f4eee4] text-muted"><Clock3 size={13} /> En preparación</span>
          <h3 className="editorial-title mt-4 text-2xl">{item.shortTitle}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
        </article>)}
      </div>
    </section>
  </div>;
}
