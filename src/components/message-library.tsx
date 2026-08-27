"use client";

import { Check, Clipboard, Heart, Search, Send } from "lucide-react";
import { useState, useTransition } from "react";
import type { MessageItem } from "@/lib/content";
import { markMessageUsed, toggleFavorite } from "@/app/app/actions";
import { trackEvent } from "@/lib/analytics-client";

const OCCASION_MAP: Record<string, string> = {
  "aprecio": "Para agradecer",
  "escucha": "Para conectar",
  "reparacion": "Después de un conflicto",
  "limites": "Para pedir algo",
  "calma": "Después de un conflicto",
};

const OCCASIONS = ["Todas", "Después de un conflicto", "Para conectar", "Para pedir algo", "Para agradecer"];

export function MessageLibrary({ items, initialFavorites, usedIds }: { items: MessageItem[]; initialFavorites: string[]; usedIds: string[] }) {
  const [search, setSearch] = useState("");
  const [activeOccasion, setActiveOccasion] = useState("Todas");
  const [favorites, setFavorites] = useState(new Set(initialFavorites));
  const [used, setUsed] = useState(new Set(usedIds));
  const [copied, setCopied] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();


  const filtered = items.filter(item => {
    const matchesSearch = [item.text, item.feeling, item.context, item.objective].join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesOccasion = activeOccasion === "Todas" || OCCASION_MAP[item.category] === activeOccasion;
    return matchesSearch && matchesOccasion;
  });

  async function copy(item: MessageItem) {
    await navigator.clipboard.writeText(item.text);
    setCopied(item.id);
    trackEvent("UseTool", { tool: "message-copy", category: item.category });
    setTimeout(() => setCopied(null), 1600);
  }

  return <div>
    <div className="grid gap-3 sm:grid-cols-[1fr]">
      <label className="relative"><Search size={18} className="absolute left-3 top-3.5 text-muted"/><input aria-label="Buscar mensajes" className="field pl-10" value={search} onChange={e => setSearch(e.target.value)} placeholder="Busca por situación, emoción o palabra…"/></label>
      {/* Occasion filter pills */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Ocasión de uso">
        {OCCASIONS.map(occ => (
          <button key={occ} role="tab" aria-selected={activeOccasion === occ} onClick={() => setActiveOccasion(occ)} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeOccasion === occ ? "border-[#547055] bg-[#e4e9df] text-[#547055]" : "border-[#ddd3c6] bg-[#fffdf8] text-muted hover:bg-[#f4eee4]"}`}>{occ}</button>
        ))}
      </div>
    </div>
    <p className="mt-3 text-sm text-muted">{filtered.length} mensajes encontrados</p>
    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(item => <article key={item.id} className="app-card flex flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="pill bg-[#e4e9df] text-[#547055]">{item.category}</span>
          {item.feeling ? <span className="pill bg-[#f4eee4] text-muted">{item.feeling}</span> : null}
        </div>
        <button disabled={pending} onClick={() => startTransition(async () => { const value = await toggleFavorite("message", item.id); setFavorites(current => { const next = new Set(current); if (value) next.add(item.id); else next.delete(item.id); return next; }); })} className="grid size-9 place-items-center rounded-lg hover:bg-[#eee8de]" aria-label="Guardar mensaje"><Heart size={17} fill={favorites.has(item.id) ? "currentColor" : "none"} className={favorites.has(item.id) ? "text-[#B85C42]" : ""}/></button>
      </div>
      <p className="mt-4 flex-1 text-[1.03rem] leading-7">&ldquo;{item.text}&rdquo;</p>
      <p className="mt-3 text-xs leading-5 text-muted">¿Cuándo usarlo? {item.context} — {item.objective}</p>
      <div className="mt-5 flex gap-2"><button onClick={() => copy(item)} className="secondary-button flex-1 text-sm">{copied === item.id ? <Check size={16}/> : <Clipboard size={16}/>} {copied === item.id ? "Copiado" : "Copiar"}</button><button disabled={used.has(item.id) || pending} onClick={() => startTransition(async () => { await markMessageUsed(item.id); setUsed(current => new Set(current).add(item.id)); })} className="secondary-button flex-1 text-sm">{used.has(item.id) ? <Check size={16}/> : <Send size={16}/>} {used.has(item.id) ? "Usado" : "Marcar usado"}</button></div>
    </article>)}</div>
  </div>;
}
