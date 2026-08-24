import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Quote, Sparkles, TriangleAlert } from "lucide-react";
import { JourneyDayControls } from "@/components/journey-day-controls";
import { requireEntitlement } from "@/lib/access";
import { getJourneyDay } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

function Reading({ text }: { text: string }) {
  return <div className="prose-nexo">{text.split(/\n\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
}

export default async function JourneyDayPage({ params }: { params: Promise<{ day: string }> }) {
  const user = await requireUser();
  await requireEntitlement(user);
  const { day: rawDay } = await params;
  const number = Number(rawDay);
  const day = getJourneyDay(number);
  if (!day) notFound();
  const [progress, favorite] = await Promise.all([
    prisma.journeyProgress.findUnique({ where: { userId_day: { userId: user.id, day: number } } }),
    prisma.favorite.findUnique({ where: { userId_resourceType_resourceId: { userId: user.id, resourceType: "journey", resourceId: `day-${String(number).padStart(2,"0")}` } } }),
  ]);
  const scripts = Array.isArray(day.conversationScript) ? day.conversationScript.map(String) : [];

  return (
    <article className="mx-auto max-w-4xl space-y-7">
      <div className="flex items-center justify-between gap-4"><Link href="/app/jornada" className="secondary-button"><ArrowLeft size={16}/> Jornada</Link><span className="pill bg-[#f0ddd5] text-[#934731]">Día {day.day} · Semana {day.week}</span></div>
      <header className="py-4"><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#74836B]">Objetivo de hoy</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">{day.title}</h1><p className="mt-5 text-lg leading-8 text-muted">{day.objective}</p></header>

      <section className="surface p-6 sm:p-9"><Reading text={day.reading}/></section>

      <section className="grid gap-5 md:grid-cols-2">
        <div className="app-card p-6"><Quote className="text-[#B85C42]"/><h2 className="editorial-title mt-4 text-2xl">Principio</h2><p className="mt-3 leading-7 text-muted">{day.principle}</p></div>
        <div className="app-card p-6"><Sparkles className="text-[#B99255]"/><h2 className="editorial-title mt-4 text-2xl">Reflexión</h2><p className="mt-3 leading-7 text-muted">{day.reflection}</p></div>
      </section>

      <section className="app-card p-6 sm:p-8"><h2 className="editorial-title text-3xl">Un ejemplo realista</h2><p className="mt-4 leading-8 text-muted">{day.example}</p></section>
      <section className="rounded-2xl border border-[#e3c7bd] bg-[#fff8f4] p-6"><div className="flex items-start gap-4"><TriangleAlert className="mt-1 shrink-0 text-[#B85C42]"/><div><h2 className="font-semibold">Un error común</h2><p className="mt-2 leading-7 text-[#6b5148]">{day.commonMistake}</p></div></div></section>

      <section className="surface p-6 sm:p-8"><h2 className="editorial-title text-3xl">Práctica del día</h2><p className="mt-4 leading-8 text-muted">{day.practice}</p><div className="mt-5 rounded-xl bg-[#e4e9df] p-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#547055]">Pequeña acción</p><p className="mt-2 font-medium leading-7 text-[#354436]">{day.smallAction}</p></div></section>

      {scripts.length ? <section className="app-card p-6 sm:p-8"><div className="flex items-center gap-3"><MessageCircle className="text-[#B85C42]"/><h2 className="editorial-title text-3xl">Guion de conversación</h2></div><ol className="mt-5 space-y-3">{scripts.map((line,index)=><li key={index} className="flex gap-3 leading-7 text-muted"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f0ddd5] text-xs font-bold text-[#934731]">{index+1}</span><span>{line}</span></li>)}</ol></section> : null}

      <section className="grid gap-5 md:grid-cols-2"><div className="app-card p-6"><h2 className="editorial-title text-2xl">Preguntas para ti</h2><ul className="mt-4 space-y-3">{day.reflectionQuestions.map((item)=><li key={item} className="flex gap-3 leading-7 text-muted"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#B85C42]"/>{item}</li>)}</ul></div><div className="app-card p-6"><h2 className="editorial-title text-2xl">Checklist</h2><ul className="mt-4 space-y-3">{day.checklist.map((item)=><li key={item} className="flex gap-3 leading-7 text-muted"><CheckCircle2 size={18} className="mt-1 shrink-0 text-[#74836B]"/>{item}</li>)}</ul></div></section>

      <section className="rounded-2xl bg-[#282621] p-7 text-[#f9f3e9] sm:p-9"><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#d9a491]">Oración</p><p className="editorial-title mt-4 text-2xl leading-relaxed">{day.prayer}</p></section>

      <JourneyDayControls day={day.day} completed={Boolean(progress?.completedAt)} favorite={Boolean(favorite)} initialNote={progress?.note ?? ""}/>
      <nav className="flex justify-between gap-3 border-t border-[#ddd3c6] pt-6">{number>1?<Link className="secondary-button" href={`/app/jornada/${number-1}`}><ArrowLeft size={16}/> Día {number-1}</Link>:<span/>}{number<21?<Link className="primary-button w-fit" href={`/app/jornada/${number+1}`}>Día {number+1} <ArrowRight size={16}/></Link>:<Link className="primary-button w-fit" href="/app/continuidad">Plan de continuidad <ArrowRight size={16}/></Link>}</nav>
    </article>
  );
}
