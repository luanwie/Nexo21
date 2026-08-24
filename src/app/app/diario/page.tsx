import Link from "next/link";
import { CalendarDays, Edit3, Plus, Trash2 } from "lucide-react";
import { deleteJournalEntry, saveJournalEntry } from "@/app/app/actions";
import { requireEntitlement } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

function dateInput(date = new Date()) { return date.toISOString().slice(0,10); }

export default async function JournalPage({ searchParams }: { searchParams: Promise<{ editar?: string }> }) {
  const user = await requireUser();
  await requireEntitlement(user);
  const { editar } = await searchParams;
  const [entries, editing] = await Promise.all([
    prisma.journalEntry.findMany({ where: { userId: user.id }, orderBy: [{ entryDate: "desc" }, { updatedAt: "desc" }] }),
    editar ? prisma.journalEntry.findFirst({ where: { id: editar, userId: user.id } }) : Promise.resolve(null),
  ]);
  return (
    <div className="space-y-7">
      <header><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Mi diario</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Un lugar privado para ordenar lo vivido.</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted">Escribe para comprenderte, no para producir una respuesta perfecta.</p></header>
      <section className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
        <form action={saveJournalEntry} className="surface h-fit p-6">
          <div className="flex items-center justify-between"><h2 className="text-lg font-semibold">{editing ? "Editar entrada" : "Nueva entrada"}</h2>{editing ? <Link href="/app/diario" className="text-sm font-semibold text-[#934731]">Cancelar</Link> : <Plus size={18} className="text-[#B85C42]"/>}</div>
          {editing ? <input type="hidden" name="id" value={editing.id}/> : null}
          <div className="mt-5"><label className="label" htmlFor="entryDate">Fecha</label><input className="field" id="entryDate" name="entryDate" type="date" defaultValue={dateInput(editing?.entryDate)} required/></div>
          <div className="mt-4"><label className="label" htmlFor="title">Título</label><input className="field" id="title" name="title" defaultValue={editing?.title ?? ""} maxLength={120} placeholder="Lo que quiero recordar" required/></div>
          <div className="mt-4"><label className="label" htmlFor="body">Escribe con libertad</label><textarea className="field" id="body" name="body" defaultValue={editing?.body ?? ""} maxLength={12000} placeholder="Hoy noté que…" required/></div>
          <button className="primary-button mt-5" type="submit">{editing ? "Guardar cambios" : "Guardar entrada"}</button>
        </form>
        <div className="space-y-3">
          {entries.length ? entries.map((entry)=><article key={entry.id} className="app-card p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#74836B]"><CalendarDays size={14}/>{new Intl.DateTimeFormat("es",{dateStyle:"long"}).format(entry.entryDate)}</p><h2 className="mt-2 text-lg font-semibold">{entry.title}</h2></div><div className="flex gap-1"><Link href={`/app/diario?editar=${entry.id}`} className="grid size-9 place-items-center rounded-lg hover:bg-[#eee8de]" aria-label="Editar"><Edit3 size={16}/></Link><form action={deleteJournalEntry.bind(null,entry.id)}><button className="grid size-9 place-items-center rounded-lg text-[#A53D3D] hover:bg-[#f6e4e0]" aria-label="Eliminar"><Trash2 size={16}/></button></form></div></div><p className="mt-4 whitespace-pre-wrap leading-7 text-muted">{entry.body}</p></article>) : <div className="app-card p-10 text-center"><p className="editorial-title text-3xl">Tu diario comienza hoy.</p><p className="mt-3 text-muted">La primera entrada puede ser una sola frase honesta.</p></div>}
        </div>
      </section>
    </div>
  );
}
