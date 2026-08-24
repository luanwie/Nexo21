"use client";

import { Check, Clock3, Search } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import type { ActionItem } from "@/lib/content";
import { completeSmallAction } from "@/app/app/actions";

export function ActionLibrary({ items, completedIds }: { items: ActionItem[]; completedIds: string[] }) {
  const [query,setQuery]=useState(""); const [category,setCategory]=useState("todas"); const [done,setDone]=useState(new Set(completedIds)); const [pending,startTransition]=useTransition();
  const categories=useMemo(()=>["todas",...new Set(items.map(item=>item.category))],[items]);
  const filtered=items.filter(item=>(category==="todas"||item.category===category)&&[item.text,item.objective].join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div><div className="grid gap-3 sm:grid-cols-[1fr_auto]"><label className="relative"><Search size={18} className="absolute left-3 top-3.5 text-muted"/><input aria-label="Buscar acciones" className="field pl-10" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Busca una acción…"/></label><select aria-label="Filtrar acciones por categoría" className="field min-w-52" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(value=><option key={value} value={value}>{value==="todas"?"Todas las categorías":value}</option>)}</select></div><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(item=><article key={item.id} className={`app-card p-5 ${done.has(item.id)?"bg-[#f1f5ed]":""}`}><div className="flex items-center justify-between"><span className="pill bg-[#f0ddd5] text-[#934731]">{item.category}</span><span className="flex items-center gap-1 text-xs text-muted"><Clock3 size={14}/>{item.durationMinutes} min</span></div><p className="mt-4 text-lg font-medium leading-7">{item.text}</p><p className="mt-3 text-sm leading-6 text-muted">{item.objective}</p><button disabled={pending||done.has(item.id)} onClick={()=>startTransition(async()=>{await completeSmallAction(item.id);setDone(current=>new Set(current).add(item.id));})} className="secondary-button mt-5 w-full text-sm"> <Check size={16}/> {done.has(item.id)?"Realizada":"Marcar como realizada"}</button></article>)}</div></div>;
}
