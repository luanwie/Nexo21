import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { PrintModuleButton } from "@/components/print-module-button";
import { requireEntitlement } from "@/lib/access";
import { getIncludedBonus } from "@/lib/included-bonuses";
import { requireUser } from "@/lib/session";

export default async function IncludedBonusPage({ params }: { params: Promise<{ slug: string }> }) {
  const user = await requireUser();
  const { slug } = await params;
  const bonus = getIncludedBonus(slug);
  if (!bonus) notFound();
  await requireEntitlement(user);

  return <div className="mx-auto max-w-5xl space-y-7 print:max-w-none print:text-black">
    <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
      <Link href="/app/biblioteca" className="secondary-button w-fit"><ArrowLeft size={16} /> Volver a mi biblioteca</Link>
      <PrintModuleButton label="Descargar como PDF" />
    </div>

    <section className="surface p-7 sm:p-10 print:border-0 print:p-0 print:shadow-none">
      <span className="pill bg-[#f0ddd5] text-[#934731]">Incluido con Nexo 21 · {bonus.format}</span>
      <Sparkles className="mt-7 text-[#B85C42] print:hidden" size={30} />
      <h1 className="editorial-title mt-4 text-4xl sm:text-6xl">{bonus.title}</h1>
      <p className="mt-4 font-[Georgia,serif] text-xl leading-8 text-[#5d493d]">{bonus.subtitle}</p>
      <p className="mt-5 max-w-4xl text-lg leading-8 text-muted">{bonus.description}</p>
      <div className="mt-7 rounded-2xl border border-[#d7dfd2] bg-[#eef2ea] p-5 text-sm leading-6 text-[#435144]">
        <p className="flex items-center gap-2 font-semibold"><ShieldCheck size={17} /> Fe, dignidad y seguridad</p>
        <p className="mt-2">Este material educativo y espiritual no sustituye apoyo profesional. La fe no exige soportar amenaza, coerción, abuso o violencia. Si existe riesgo, prioriza tu seguridad y busca ayuda local especializada desde un medio seguro.</p>
      </div>
    </section>

    <section className="space-y-5">
      <div className="flex items-center gap-2"><BookOpen size={19} className="text-[#B85C42]" /><h2 className="editorial-title text-3xl">Lectura guiada</h2></div>
      {bonus.sections.map((section, sectionIndex) => <article key={section.title} className="app-card p-6 sm:p-8 print:break-inside-avoid print:border-0 print:p-0">
        <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#934731]">Capítulo {sectionIndex + 1}</p>
        <h2 className="editorial-title mt-2 text-3xl">{section.title}</h2>
        <p className="mt-3 leading-7 text-muted">{section.summary}</p>
        <div className="mt-6 space-y-3">
          {section.items.map((item, itemIndex) => <details key={item.title} className="rounded-2xl border border-[#ddd3c6] bg-[#fffdf8] p-4 open:bg-white print:break-inside-avoid" open={itemIndex === 0}>
            <summary className="cursor-pointer font-semibold">{item.title}</summary>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
              <p>{item.body}</p>
              <div className="rounded-xl bg-[#f4eee4] p-4"><strong className="text-[#5d493d]">Para reflexionar:</strong> {item.prompt}</div>
              <p className="flex gap-2"><CheckCircle2 size={17} className="mt-1 shrink-0 text-[#547055]" /><span><strong>Práctica:</strong> {item.action}</span></p>
            </div>
          </details>)}
        </div>
      </article>)}
    </section>
  </div>;
}
