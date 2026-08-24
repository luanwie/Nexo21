"use client";

import { Check, Clipboard, Heart, Search, Send } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import type { MessageItem } from "@/lib/content";
import { markMessageUsed, toggleFavorite } from "@/app/app/actions";
import { trackEvent } from "@/lib/analytics-client";

export function MessageLibrary({ items, initialFavorites, usedIds }: { items: MessageItem[]; initialFavorites: string[]; usedIds: string[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todas");
  const [favorites, setFavorites] = useState(new Set(initialFavorites));
  const [used, setUsed] = useState(new Set(usedIds));
  const [copied, setCopied] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const categories = useMemo(()=>["todas",...new Set(items.map(item=>item.category))], [items]);
  const filtered = items.filter(item => (category === "todas" || item.category === category) && [item.text,item.feeling,item.context,item.objective].join(" ").toLowerCase().includes(search.toLowerCase()));

  async function copy(item: MessageItem) {
    await navigator.clipboard.writeText(item.text);
    setCopied(item.id);
    trackEvent("UseTool", { tool: "message-copy", category: item.category });
    setTimeout(()=>setCopied(null),1600);
  }

  return <div>
    <div className="grid gap-3 sm:grid-cols-[1fr_auto]"><label className="relative"><Search size={18} className="absolute left-3 top-3.5 text-muted"/><input aria-label="Buscar mensajes" className="field pl-10" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Busca por situación, emoción o palabra…"/></label><select className="field min-w-52" value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filtrar categoría">{categories.map(value=><option key={value} value={value}>{value === "todas" ? "Todas las categorías" : value}</option>)}</select></div>
    <p className="mt-3 text-sm text-muted">{filtered.length} mensajes encontrados</p>
    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(item=><article key={item.id} className="app-card flex flex-col p-5"><div className="flex items-center justify-between gap-3"><span className="pill bg-[#e4e9df] text-[#547055]">{item.category}</span><button disabled={pending} onClick={()=>startTransition(async()=>{const value=await toggleFavorite("message",item.id);setFavorites(current=>{const next=new Set(current); if(value)next.add(item.id);else next.delete(item.id);return next;});})} className="grid size-9 place-items-center rounded-lg hover:bg-[#eee8de]" aria-label="Guardar mensaje"><Heart size={17} fill={favorites.has(item.id)?"currentColor":"none"} className={favorites.has(item.id)?"text-[#B85C42]":""}/></button></div><p className="mt-4 flex-1 text-[1.03rem] leading-7">“{item.text}”</p><p className="mt-4 text-xs leading-5 text-muted">{item.context}</p><div className="mt-5 flex gap-2"><button onClick={()=>copy(item)} className="secondary-button flex-1 text-sm">{copied===item.id?<Check size={16}/>:<Clipboard size={16}/>} {copied===item.id?"Copiado":"Copiar"}</button><button disabled={used.has(item.id)||pending} onClick={()=>startTransition(async()=>{await markMessageUsed(item.id);setUsed(current=>new Set(current).add(item.id));})} className="secondary-button flex-1 text-sm">{used.has(item.id)?<Check size={16}/>:<Send size={16}/>} {used.has(item.id)?"Usado":"Marcar usado"}</button></div></article>)}</div>
  </div>;
}
