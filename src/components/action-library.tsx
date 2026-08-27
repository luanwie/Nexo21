"use client";

import { Check, Clock3, Search, TrendingUp } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import type { ActionItem } from "@/lib/content";
import { completeSmallAction } from "@/app/app/actions";

function difficulty(minutes: number): { label: string; color: string } {
  if (minutes < 10) return { label: "Fácil", color: "bg-[#e4e9df] text-[#547055]" };
  if (minutes <= 20) return { label: "Moderada", color: "bg-[#f4eee4] text-[#934731]" };
  return { label: "Reflexiva", color: "bg-[#f0ddd5] text-[#934731]" };
}

export function ActionLibrary({ items, completedIds }: { items: ActionItem[]; completedIds: string[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todas");
  const [done, setDone] = useState(new Set(completedIds));
  const [pending, startTransition] = useTransition();

  const categories = useMemo(() => ["todas", ...new Set(items.map(item => item.category))], [items]);
  const filtered = items.filter(item => (activeCategory === "todas" || item.category === activeCategory) && [item.text, item.objective].join(" ").toLowerCase().includes(query.toLowerCase()));

  // Group by category for display
  const grouped = useMemo(() => {
    if (activeCategory !== "todas") return { [activeCategory]: filtered };
    const groups: Record<string, ActionItem[]> = {};
    for (const item of filtered) {
      (groups[item.category] ??= []).push(item);
    }
    return groups;
  }, [filtered, activeCategory]);

  const completedCount = done.size;
  const totalCount = items.length;

  return <div>
    <div className="grid gap-3 sm:grid-cols-[1fr]">
      <label className="relative"><Search size={18} className="absolute left-3 top-3.5 text-muted"/><input aria-label="Buscar acciones" className="field pl-10" value={query} onChange={e => setQuery(e.target.value)} placeholder="Busca una acción…"/></label>
      {/* Category pills */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías de acciones">
        {categories.map(cat => (
          <button key={cat} role="tab" aria-selected={activeCategory === cat} onClick={() => setActiveCategory(cat)} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeCategory === cat ? "border-[#547055] bg-[#e4e9df] text-[#547055]" : "border-[#ddd3c6] bg-[#fffdf8] text-muted hover:bg-[#f4eee4]"}`}>{cat === "todas" ? "Todas" : cat}</button>
        ))}
      </div>
    </div>

    {/* Completion stats */}
    <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#f4eee4] px-4 py-3">
      <TrendingUp size={18} className="text-[#934731]"/>
      <p className="text-sm font-medium">{completedCount} de {totalCount} realizadas</p>
      {totalCount > 0 ? <div className="flex-1 overflow-hidden rounded-full bg-[#e4d9cc]"><div className="h-1.5 rounded-full bg-[#B85C42] transition-all" style={{ width: `${Math.round((completedCount / totalCount) * 100)}%` }}/></div> : null}
    </div>

    {/* Grouped actions */}
    <div className="mt-5 space-y-6">
      {Object.entries(grouped).map(([category, catItems]) => (
        <div key={category}>
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted">{category}</h3>
          <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{catItems.map(item => {
            const diff = difficulty(item.durationMinutes);
            return <article key={item.id} className={`app-card p-5 ${done.has(item.id) ? "bg-[#f1f5ed]" : ""}`}>
              <div className="flex items-center justify-between">
                <span className={`pill ${diff.color}`}>{diff.label}</span>
                <span className="flex items-center gap-1 text-xs text-muted"><Clock3 size={14}/>{item.durationMinutes} min</span>
              </div>
              <p className="mt-4 text-lg font-medium leading-7">{item.text}</p>
              <p className="mt-3 text-sm leading-6 text-muted">{item.objective}</p>
              <button disabled={pending || done.has(item.id)} onClick={() => startTransition(async () => { await completeSmallAction(item.id); setDone(current => new Set(current).add(item.id)); })} className="secondary-button mt-5 w-full text-sm"> <Check size={16}/> {done.has(item.id) ? "Realizada" : "Marcar como realizada"}</button>
            </article>;
          })}</div>
        </div>
      ))}
    </div>
  </div>;
}
