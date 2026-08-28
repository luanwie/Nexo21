import Link from "next/link";
import { CheckCircle2, ExternalLink, PackageCheck, Sparkles } from "lucide-react";
import { listEntitlements } from "@/lib/access";
import { INCLUDED_BONUSES } from "@/lib/included-bonuses";
import { OFFERS } from "@/lib/offers";
import { requireUser } from "@/lib/session";

export default async function LibraryPage() {
  const user = await requireUser();
  const entitlements = await listEntitlements(user);
  const owned = new Set(entitlements.map((item) => item.product.slug));

  const purchased = OFFERS.filter(
    (offer) => owned.has(offer.slug) || user.role === "ADMIN"
  );
  const main = purchased.filter((o) => o.type === "MAIN");
  const extras = purchased.filter((o) => o.type !== "MAIN");

  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#547055]">
          Mi biblioteca
        </p>
        <h1 className="editorial-title mt-3 text-4xl sm:text-6xl">
          Todo lo que ya es tuyo.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
          Accede directamente a los productos que compraste. Si algo no aparece, verifica que ingresaste con el mismo correo de la compra.
        </p>
      </header>

      {purchased.length === 0 ? (
        <div className="app-card p-12 text-center">
          <PackageCheck className="mx-auto text-[#B85C42]" size={40} />
          <h2 className="editorial-title mt-5 text-3xl">Tu biblioteca está vacía.</h2>
          <p className="mx-auto mt-3 max-w-md leading-7 text-muted">
            Cuando compres tu primer producto, aparecerá aquí con acceso inmediato.
          </p>
          <Link href="/app/tienda" className="primary-button mt-6 inline-flex">
            <Sparkles size={16} /> Explorar la tienda
          </Link>
        </div>
      ) : (
        <>
          {main.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[.16em] text-muted mb-4">
                Jornada principal
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                {main.map((offer) => (
                  <article key={offer.slug} className="app-card flex flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="pill bg-[#e4e9df] text-[#547055]">Jornada</span>
                      <PackageCheck size={20} className="text-[#547055]" />
                    </div>
                    <h3 className="editorial-title mt-5 text-3xl">{offer.shortTitle}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                      {offer.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-muted">
                      {offer.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#547055]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/app" className="primary-button mt-6 w-full">
                      <ExternalLink size={16} /> Abrir mi jornada
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {main.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[.16em] text-muted mb-4">
                5 ebooks incluidos con Nexo 21
              </h2>
              <p className="mb-5 max-w-3xl text-sm leading-6 text-muted">
                Léelos aquí o usa “Descargar como PDF” dentro de cada ebook. Ya están incluidos en tu acceso; no requieren otra compra.
              </p>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {INCLUDED_BONUSES.map((bonus) => (
                  <article key={bonus.slug} className="app-card flex flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="pill bg-[#f0ddd5] text-[#934731]">Incluido</span>
                      <PackageCheck size={20} className="text-[#547055]" />
                    </div>
                    <h3 className="editorial-title mt-5 text-3xl">{bonus.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted">{bonus.description}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[.12em] text-[#547055]">{bonus.format}</p>
                    <Link href={`/app/bonus/${bonus.slug}`} className="secondary-button mt-5 w-full text-center text-sm">
                      Leer o descargar
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}

          {extras.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-[.16em] text-muted mb-4">
                Contenido adicional
              </h2>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {extras.map((offer) => (
                  <article key={offer.slug} className="app-card flex flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="pill bg-[#f4eee4] text-muted">
                        {offer.type === "BUMP" ? "Complemento" : offer.type === "UPSELL" ? "Premium" : offer.type === "SUBSCRIPTION" ? "Membresía" : "Módulo"}
                      </span>
                      <PackageCheck size={20} className="text-[#547055]" />
                    </div>
                    <h3 className="editorial-title mt-4 text-2xl">{offer.shortTitle}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                      {offer.description}
                    </p>
                    <Link
                      href={`/app/extras/${offer.slug}`}
                      className="secondary-button mt-5 w-full text-center text-sm"
                    >
                      Abrir contenido
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
