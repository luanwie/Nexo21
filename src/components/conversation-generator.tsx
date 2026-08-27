"use client";

import { CheckCircle2, Heart, MessageCircle, Search, ShieldAlert, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import type { ConversationItem } from "@/lib/content";
import { toggleFavorite } from "@/app/app/actions";
import { trackEvent } from "@/lib/analytics-client";

const CONV_CATEGORIES: Record<string, string[]> = {
  "Comunicación": ["Reparto de tareas del hogar", "Presupuesto y gastos", "Uso del teléfono", "Privacidad en redes", "Puntualidad y retrasos", "Vacaciones con preferencias", "Amistades y vida social", "Expectativas sobre celebraciones", "Diferencias en la crianza", "Diferencias de práctica espiritual"],
  "Conflicto": ["Celos y confianza", "Reacciones defensivas", "Comparaciones con otras parejas", "Conflicto sobre valores políticos", "Una promesa incumplida", "Deudas anteriores", "Hábitos de sueño incompatibles", "Disculpa después"],
  "Conexión": ["Desconexión después", "Frecuencia de la intimidad", "Necesidad de tiempo a solas", "Dolor por una pérdida"],
  "Límites": ["Familia extensa", "Cuidado de una persona enferma", "Cambio o pérdida de empleo", "Seguridad ante control"],
  "Perdón": ["Disculpa después de palabras hirientes"],
};

function getCategory(situation: string): string {
  for (const [cat, keywords] of Object.entries(CONV_CATEGORIES)) {
    if (keywords.some(k => situation.startsWith(k))) return cat;
  }
  return "Comunicación";
}

const TABS = ["Todas", "Comunicación", "Conflicto", "Conexión", "Límites", "Perdón"];

export function ConversationGenerator({ items, initialFavorites }: { items: ConversationItem[]; initialFavorites: string[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ConversationItem | null>(null);
  const [favorites, setFavorites] = useState(new Set(initialFavorites));
  const [activeTab, setActiveTab] = useState("Todas");
  const [pending, startTransition] = useTransition();

  const filtered = items.filter(item => {
    const matchesSearch = item.situation.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeTab === "Todas" || getCategory(item.situation) === activeTab;
    return matchesSearch && matchesCategory;
  });

  function choose(item: ConversationItem) { setSelected(item); trackEvent("UseTool", { tool: "conversation-generator", situation: item.id }); }

  return <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr]">
    <aside className="app-card h-fit p-5">
      <label className="relative block"><Search size={17} className="absolute left-3 top-3.5 text-muted"/><input aria-label="Buscar conversaciones" className="field pl-10" value={query} onChange={e => setQuery(e.target.value)} placeholder="¿Sobre qué necesitas hablar?"/></label>

      {/* Category tabs */}
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Categorías de conversación">
        {TABS.map(tab => (
          <button key={tab} role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTab === tab ? "border-[#547055] bg-[#e4e9df] text-[#547055]" : "border-[#ddd3c6] bg-[#fffdf8] text-muted hover:bg-[#f4eee4]"}`}>{tab}</button>
        ))}
      </div>

      <div className="mt-4 max-h-[62vh] space-y-2 overflow-y-auto pr-1">{filtered.map(item => <button key={item.id} onClick={() => choose(item)} className={`w-full rounded-xl border p-3 text-left transition ${selected?.id === item.id ? "border-[#B85C42] bg-[#fff4ee]" : "border-[#ddd3c6] bg-[#fffdf8] hover:bg-[#f4eee4]"}`}>
        <span className="text-sm font-medium">{item.situation}</span>
        <p className="mt-1 text-xs leading-4 text-muted line-clamp-1">{item.preparation[0]}</p>
      </button>)}</div>
    </aside>

    {selected ? <article className="surface p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#74836B]">Guía de conversación</p><h2 className="editorial-title mt-2 text-3xl sm:text-4xl">{selected.situation}</h2><p className="mt-1 pill bg-[#e4e9df] text-[#547055]">{getCategory(selected.situation)}</p></div>
        <button disabled={pending} onClick={() => startTransition(async () => { const value = await toggleFavorite("conversation", selected.id); setFavorites(current => { const next = new Set(current); if (value) next.add(selected.id); else next.delete(selected.id); return next; }); })} className="grid size-10 place-items-center rounded-xl border border-[#ddd3c6]" aria-label="Guardar conversación"><Heart size={18} fill={favorites.has(selected.id) ? "currentColor" : "none"} className={favorites.has(selected.id) ? "text-[#B85C42]" : ""}/></button>
      </div>
      <section className="mt-7"><h3 className="font-semibold">Antes de comenzar</h3><ul className="mt-3 space-y-2">{selected.preparation.map(item => <li key={item} className="flex gap-3 leading-7 text-muted"><CheckCircle2 size={17} className="mt-1 shrink-0 text-[#74836B]"/>{item}</li>)}</ul></section>
      <section className="mt-7 rounded-2xl bg-[#e4e9df] p-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#547055]">Una apertura posible</p><p className="mt-3 text-lg leading-8 text-[#354436]">&ldquo;{selected.opening}&rdquo;</p></section>
      <div className="mt-7 grid gap-5 md:grid-cols-2"><section className="rounded-2xl border border-[#cfd8c9] p-5"><h3 className="flex items-center gap-2 font-semibold text-[#547055]"><CheckCircle2 size={18}/> Frases que ayudan</h3><ul className="mt-3 space-y-3">{selected.recommendedPhrases.map(item => <li key={item} className="leading-6 text-muted">{item}</li>)}</ul></section><section className="rounded-2xl border border-[#e3c7bd] p-5"><h3 className="flex items-center gap-2 font-semibold text-[#A53D3D]"><XCircle size={18}/> Frases que conviene evitar</h3><ul className="mt-3 space-y-3">{selected.avoidPhrases.map(item => <li key={item} className="leading-6 text-muted">{item}</li>)}</ul></section></div>
      <section className="mt-7"><h3 className="flex items-center gap-2 font-semibold"><MessageCircle size={18} className="text-[#B85C42]"/> Preguntas para comprender</h3><ol className="mt-3 space-y-2">{selected.questions.map((item, index) => <li key={item} className="flex gap-3 leading-7 text-muted"><span className="font-semibold text-[#B85C42]">{index + 1}.</span>{item}</li>)}</ol></section>
      <section className="mt-7 rounded-2xl bg-[#f4eee4] p-5"><p className="text-xs font-semibold uppercase tracking-[.16em] text-muted">Para cerrar</p><p className="mt-3 leading-7">{selected.closing}</p></section>
      <p className="mt-6 flex gap-2 text-xs leading-5 text-muted"><ShieldAlert size={16} className="shrink-0 text-[#A53D3D]"/>{selected.disclaimer}</p>
    </article> : <div className="app-card grid min-h-[480px] place-items-center p-10 text-center"><div><MessageCircle className="mx-auto text-[#B85C42]" size={36}/><h2 className="editorial-title mt-5 text-3xl">Elige una situación.</h2><p className="mx-auto mt-3 max-w-md leading-7 text-muted">Recibirás una preparación, una apertura, preguntas y un cierre. No un resultado garantizado.</p></div></div>}
  </div>;
}
