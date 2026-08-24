import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { CheckoutForm } from "@/components/checkout-form";
import { getCheckoutReadiness } from "@/lib/checkout-readiness";
import { requiresPreCheckoutEmail, shouldDisplayLocalBumps } from "@/lib/domain/checkout";
import { getOffer, OFFERS } from "@/lib/offers";

export const metadata: Metadata = { title: "Checkout seguro", robots: { index: false, follow: false } };

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const requested = getOffer(product ?? "nexo-21");
  const primary = requested?.launchReady ? requested : getOffer("nexo-21")!;
  const provider = process.env.CHECKOUT_PROVIDER;
  const bumps = primary.type === "MAIN" && shouldDisplayLocalBumps(provider)
    ? OFFERS.filter((item) => item.type === "BUMP" && item.launchReady)
    : [];
  const collectEmail = requiresPreCheckoutEmail(provider);
  const readiness = provider === "hotmart" ? await getCheckoutReadiness(primary.slug) : null;
  const checkoutAvailable = provider === "mock" || readiness?.ready === true;

  return <main className="min-h-screen bg-[#F5F1E8] px-4 py-6 sm:py-10">
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <BrandLogo />
        <Link href={primary.type === "MAIN" ? "/" : "/app/tienda"} className="secondary-button"><ArrowLeft size={16} /> Volver</Link>
      </div>
      <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_.85fr]">
        <section className="surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#B85C42]">Tu acceso</p>
          <h1 className="editorial-title mt-3 text-4xl sm:text-5xl">{primary.title}</h1>
          <p className="mt-4 text-lg leading-8 text-muted">{primary.description}</p>
          <div className="mt-7 space-y-3">{primary.features.map((feature) => <p key={feature} className="flex gap-3 leading-7"><CheckCircle2 size={18} className="mt-1 shrink-0 text-[#74836B]" />{feature}</p>)}</div>
          <div className="mt-8 rounded-2xl bg-[#e4e9df] p-5"><p className="text-sm font-semibold text-[#547055]">Lo que proponemos</p><p className="mt-2 text-sm leading-6 text-[#435144]">Un proceso educativo para practicar lo que está bajo tu control. No prometemos cambiar a tu pareja ni garantizar un resultado de relación.</p></div>
        </section>
        <section className="surface h-fit p-6 sm:p-8">
          {checkoutAvailable
            ? <CheckoutForm primary={primary} bumps={bumps} collectEmail={collectEmail} />
            : <div className="text-center"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#f4eee4] text-[#934731]"><LockKeyhole /></span><h2 className="editorial-title mt-5 text-3xl">Checkout protegido</h2><p className="mt-3 leading-7 text-muted">Este contenido está completo, pero la cobranza solo se habilita cuando checkout, HOTTOK, mapeo y entrega automática están conectados. No se realizará ningún cobro desde esta pantalla.</p><Link href="/app/tienda" className="secondary-button mt-6">Volver a la tienda</Link></div>}
        </section>
      </div>
      <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-muted">Nexo 21 es material educativo y espiritual. No sustituye terapia, asesoría legal ni servicios de emergencia. Ante violencia, coerción, amenazas o riesgo físico, prioriza tu seguridad y busca ayuda local especializada.</p>
    </div>
  </main>;
}