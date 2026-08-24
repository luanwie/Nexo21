import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Flame, HeartHandshake, LockKeyhole, NotebookPen, Sparkles } from "lucide-react";
import { listEntitlements } from "@/lib/access";
import { getJourneyDay } from "@/lib/content";
import { summarizeProgress } from "@/lib/domain/progress";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  const entitlements = await listEntitlements(user);
  const ownsMain = user.role === "ADMIN" || entitlements.some((item) => item.product.slug === "nexo-21");
  const [progressRows, journalCount, actionCount] = await Promise.all([
    prisma.journeyProgress.findMany({ where: { userId: user.id, completedAt: { not: null } }, orderBy: { day: "asc" } }),
    prisma.journalEntry.count({ where: { userId: user.id } }),
    prisma.actionCompletion.count({ where: { userId: user.id } }),
  ]);
  const progress = summarizeProgress(progressRows.map((item) => item.day), 21);
  const today = getJourneyDay(progress.currentDay);

  if (!ownsMain) {
    return (
      <div className="mx-auto max-w-3xl py-12">
        <div className="surface p-7 text-center sm:p-12">
          <div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-[#e4e9df] text-[#547055]"><LockKeyhole /></div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[.18em] text-[#B85C42]">Tu cuenta está lista</p>
          <h1 className="editorial-title text-4xl sm:text-5xl">Desbloquea tu camino de 21 días.</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted">Si ya compraste con {user.email}, actualiza esta página: asociamos automáticamente tu compra. Si todavía no compraste, puedes comenzar por US$9.90.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/checkout?product=nexo-21" className="primary-button">Ver la oferta <ArrowRight size={18} /></Link><Link href="/app/tienda" className="secondary-button">Explorar extras</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-sm font-semibold text-[#B85C42]">Hola, {user.name.split(" ")[0]}</p><h1 className="editorial-title mt-2 text-4xl sm:text-5xl">Tu siguiente paso está aquí.</h1><p className="mt-3 max-w-2xl text-muted">No necesitas resolver todo hoy. Una práctica honesta y pequeña es suficiente.</p></div>
        <span className="pill w-fit bg-[#e4e9df] text-[#547055]"><Flame size={15} /> Secuencia: {progress.streak} días</span>
      </header>

      <section className="surface overflow-hidden p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <span className="pill bg-[#f0ddd5] text-[#934731]">Día {progress.currentDay} de 21</span>
            <h2 className="editorial-title mt-4 text-3xl sm:text-4xl">{today?.title ?? "Tu camino está completo"}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted">{today?.objective ?? "Vuelve a tus notas y elige una práctica para continuar."}</p>
            <Link href={today ? `/app/jornada/${today.day}` : "/app/jornada"} className="primary-button mt-6 w-fit">Continuar la jornada <ArrowRight size={18} /></Link>
          </div>
          <div className="rounded-2xl border border-[#ddd3c6] bg-[#f8f4ec] p-6">
            <div className="flex items-end justify-between"><span className="text-sm font-medium text-muted">Progreso</span><strong className="text-3xl text-[#25231f]">{progress.percent}%</strong></div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#ded7ca]"><div className="h-full rounded-full bg-[#B85C42]" style={{ width: `${progress.percent}%` }} /></div>
            <div className="mt-4 flex justify-between text-sm text-muted"><span>{progress.completedDays} días completados</span><span>{21 - progress.completedDays} por descubrir</span></div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Link href="/app/diario" className="app-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><NotebookPen className="text-[#B85C42]" /><p className="mt-5 text-2xl font-semibold">{journalCount}</p><p className="mt-1 text-sm text-muted">entradas en tu diario</p></Link>
        <Link href="/app/acciones" className="app-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><HeartHandshake className="text-[#74836B]" /><p className="mt-5 text-2xl font-semibold">{actionCount}</p><p className="mt-1 text-sm text-muted">pequeñas acciones realizadas</p></Link>
        <Link href="/app/favoritos" className="app-card p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><Sparkles className="text-[#B99255]" /><p className="mt-5 text-2xl font-semibold">Tu biblioteca</p><p className="mt-1 text-sm text-muted">mensajes y recursos guardados</p></Link>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="app-card p-6"><div className="flex items-center gap-3"><BookOpen className="text-[#B85C42]"/><h2 className="text-lg font-semibold">Una lectura para hoy</h2></div><p className="mt-4 leading-7 text-muted">{today?.principle ?? "La continuidad no exige perfección; exige volver con honestidad."}</p><Link href="/app/devocionales" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#934731]">Abrir devocionales <ArrowRight size={15}/></Link></div>
        <div className="app-card p-6"><div className="flex items-center gap-3"><CheckCircle2 className="text-[#74836B]"/><h2 className="text-lg font-semibold">Recuerda</h2></div><p className="mt-4 leading-7 text-muted">Tu progreso se mide por prácticas conscientes, no por conseguir una respuesta específica de otra persona.</p><Link href="/app/comenzar" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#547055]">Revisar cómo usar Nexo 21 <ArrowRight size={15}/></Link></div>
      </section>
    </div>
  );
}
