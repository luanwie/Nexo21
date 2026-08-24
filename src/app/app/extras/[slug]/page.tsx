import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, Library, ShieldCheck, Sparkles } from "lucide-react";
import { PrintModuleButton } from "@/components/print-module-button";
import { requireEntitlement } from "@/lib/access";
import { getOffer } from "@/lib/offers";
import { getProductModule, loadModuleLibrary } from "@/lib/product-modules";
import { requireUser } from "@/lib/session";

export default async function ExtraPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;
  const offer = getOffer(slug);
  const productModule = getProductModule(slug);
  if (!offer || offer.type === "MAIN" || !productModule) notFound();
  await requireEntitlement(user, slug);
  const library = loadModuleLibrary(productModule);

  return <div className="mx-auto max-w-5xl space-y-7 print:max-w-none print:text-black">
    <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
      <Link href="/app/tienda" className="secondary-button w-fit"><ArrowLeft size={16} /> Volver a la tienda</Link>
      <PrintModuleButton />
    </div>

    <section className="surface p-7 sm:p-10 print:border-0 print:p-0 print:shadow-none">
      <span className="pill bg-[#f0ddd5] text-[#934731]">Experiencia desbloqueada · versión {productModule.version}</span>
      <Sparkles className="mt-7 text-[#B85C42] print:hidden" size={30} />
      <h1 className="editorial-title mt-4 text-4xl sm:text-6xl">{productModule.title}</h1>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-muted">{productModule.intro}</p>
      <div className="mt-7 rounded-2xl border border-[#d7dfd2] bg-[#eef2ea] p-5 text-sm leading-6 text-[#435144]">
        <p className="flex items-center gap-2 font-semibold"><ShieldCheck size={17} /> Uso responsable</p>
        <p className="mt-2">{productModule.safetyNotice}</p>
      </div>
    </section>

    <section className="space-y-5">
      <div className="flex items-center gap-2"><BookOpen size={19} className="text-[#B85C42]" /><h2 className="editorial-title text-3xl">Contenido guiado</h2></div>
      {productModule.sections.map((section, sectionIndex) => <article key={section.id} className="app-card p-6 sm:p-8 print:break-inside-avoid print:border-0 print:p-0">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#934731]">Sección {sectionIndex + 1}</p>
        <h3 className="editorial-title mt-2 text-3xl">{section.title}</h3>
        <p className="mt-3 leading-7 text-muted">{section.summary}</p>
        <div className="mt-6 space-y-3">
          {section.items.map((item, itemIndex) => <details key={`${section.id}-${itemIndex}`} className="rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-4 open:bg-white print:break-inside-avoid" open={itemIndex === 0}>
            <summary className="cursor-pointer font-semibold">{item.title}</summary>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>{item.body}</p>
              <div className="rounded-xl bg-[#f4eee4] p-4"><strong className="text-[#5d493d]">Para escribir:</strong> {item.prompt}</div>
              <p className="flex gap-2"><CheckCircle2 size={17} className="mt-1 shrink-0 text-[#547055]" /><span><strong>Práctica:</strong> {item.action}</span></p>
            </div>
          </details>)}
        </div>
      </article>)}
    </section>

    {productModule.library ? <section className="space-y-5">
      <div className="flex items-center gap-2"><Library size={19} className="text-[#B85C42]" /><h2 className="editorial-title text-3xl">{productModule.library.title}</h2></div>
      <p className="text-sm text-muted">{library.length} recursos incluidos en esta versión.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {library.map((item) => <details key={item.id} className="app-card p-4 print:break-inside-avoid">
          <summary className="cursor-pointer font-semibold">{item.title}</summary>
          <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.12em] text-[#934731]">{item.meta}</p>
        </details>)}
      </div>
    </section> : null}
  </div>;
}