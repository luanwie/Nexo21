import Link from "next/link";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { requireEntitlement } from "@/lib/access";
import { loadJourney } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

const weekNames = ["Conciencia y comprensión", "Diálogo y encuentro", "Continuidad y hábitos"];

export default async function JourneyPage() {
  const user = await requireUser();
  await requireEntitlement(user);
  const days = loadJourney();
  const completed = await prisma.journeyProgress.findMany({ where: { userId: user.id, completedAt: { not: null } }, select: { day: true } });
  const completedSet = new Set(completed.map((item) => item.day));
  const firstOpen = Array.from({ length: 21 }, (_, index) => index + 1).find((day) => !completedSet.has(day)) ?? 21;

  return (
    <div className="space-y-9">
      <header><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Mi jornada</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Veintiún días, un paso cada vez.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Puedes volver a cualquier día ya abierto. La secuencia cuida el ritmo, no busca presionarte.</p></header>
      {[1,2,3].map((week) => (
        <section key={week}>
          <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#74836B]">Semana {week}</p><h2 className="editorial-title mt-1 text-3xl">{weekNames[week-1]}</h2></div><span className="text-sm text-muted">{days.filter((day)=>day.week===week && completedSet.has(day.day)).length}/7</span></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {days.filter((day)=>day.week===week).map((day) => {
              const done = completedSet.has(day.day);
              const locked = day.day > firstOpen + 1 && !done;
              return locked ? (
                <div key={day.day} className="app-card flex min-h-36 items-start gap-4 p-5 opacity-55"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eee8de] text-muted"><LockKeyhole size={17}/></span><div><p className="text-xs font-semibold uppercase tracking-wider text-muted">Día {day.day}</p><h3 className="mt-2 font-semibold leading-6">{day.title}</h3><p className="mt-2 text-xs text-muted">Completa los días anteriores para abrirlo.</p></div></div>
              ) : (
                <Link key={day.day} href={`/app/jornada/${day.day}`} className="app-card group flex min-h-36 items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lg"><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${done ? "bg-[#e4e9df] text-[#547055]" : "bg-[#f0ddd5] text-[#934731]"}`}>{done ? <Check size={18}/> : day.day}</span><div className="min-w-0 flex-1"><p className="text-xs font-semibold uppercase tracking-wider text-muted">Día {day.day}</p><h3 className="mt-2 font-semibold leading-6">{day.title}</h3><span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#934731]">{done ? "Revisar" : "Comenzar"} <ArrowRight size={13} className="transition group-hover:translate-x-1"/></span></div></Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
