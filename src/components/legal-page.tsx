import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export function LegalPage({
  eyebrow,
  title,
  updated = "23 de agosto de 2026",
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F5F1E8] px-5 py-8 text-[#25231F] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-4">
          <BrandLogo />
          <Link href="/" className="secondary-button">Volver</Link>
        </header>
        <article className="surface mt-10 p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#934731]">{eyebrow}</p>
          <h1 className="editorial-title mt-3 text-4xl sm:text-6xl">{title}</h1>
          <p className="mt-3 text-sm text-muted">Última actualización: {updated}</p>
          <div className="legal-copy mt-9 space-y-7 text-sm leading-7 text-muted sm:text-base">{children}</div>
        </article>
      </div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="editorial-title text-2xl text-[#25231F]">{title}</h2><div className="mt-2 space-y-2">{children}</div></section>;
}
