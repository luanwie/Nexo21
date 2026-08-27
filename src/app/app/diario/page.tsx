import Link from "next/link";
import { CalendarDays, Edit3, Lightbulb, Tag, Trash2 } from "lucide-react";
import { deleteJournalEntry } from "@/app/app/actions";
import { requireEntitlement } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { JournalForm } from "@/components/journal-form";


const MOOD_EMOJI: Record<string, string> = { "feliz": "😊", "neutral": "😐", "triste": "😔", "angustiada": "😢", "orando": "🙏" };
const PRESET_TAGS = ["gratitud", "reflexión", "oración", "conversación", "límite"];

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
        <JournalForm editing={editing} presetTags={PRESET_TAGS} />
        <div className="space-y-3">
          {entries.length ? entries.map((entry) => {
            const entryTags: string[] = entry.tags ? JSON.parse(entry.tags) : [];
            return <article key={entry.id} className="app-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#74836B]"><CalendarDays size={14}/>{new Intl.DateTimeFormat("es",{dateStyle:"long"}).format(entry.entryDate)}</p>
                  <h2 className="mt-2 text-lg font-semibold">{entry.mood ? MOOD_EMOJI[entry.mood] + " " : ""}{entry.title}</h2>
                </div>
                <div className="flex gap-1"><Link href={`/app/diario?editar=${entry.id}`} className="grid size-9 place-items-center rounded-lg hover:bg-[#eee8de]" aria-label="Editar"><Edit3 size={16}/></Link><form action={deleteJournalEntry.bind(null,entry.id)}><button className="grid size-9 place-items-center rounded-lg text-[#A53D3D] hover:bg-[#f6e4e0]" aria-label="Eliminar"><Trash2 size={16}/></button></form></div>
              </div>
              {entry.prompt ? <p className="mt-3 flex items-center gap-2 text-xs text-[#934731]"><Lightbulb size={13}/>{entry.prompt}</p> : null}
              <p className="mt-4 whitespace-pre-wrap leading-7 text-muted">{entry.body}</p>
              {entryTags.length ? <div className="mt-3 flex flex-wrap gap-2">{entryTags.map(t => <span key={t} className="pill bg-[#e4e9df] text-[#547055]"><Tag size={11}/> {t}</span>)}</div> : null}
            </article>;
          }) : <div className="app-card p-10 text-center"><p className="editorial-title text-3xl">Tu diario comienza hoy.</p><p className="mt-3 text-muted">La primera entrada puede ser una sola frase honesta.</p></div>}
        </div>
      </section>
    </div>
  );
}
