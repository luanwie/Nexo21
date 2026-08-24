"use client";

import { Check, Heart, Loader2, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { saveDayNote, setDayComplete, toggleFavorite } from "@/app/app/actions";

export function JourneyDayControls({ day, completed, favorite, initialNote }: { day: number; completed: boolean; favorite: boolean; initialNote: string }) {
  const [isComplete, setComplete] = useState(completed);
  const [isFavorite, setFavorite] = useState(favorite);
  const [note, setNote] = useState(initialNote);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <button className={isComplete ? "secondary-button border-[#74836B] text-[#547055]" : "primary-button"} disabled={pending} onClick={() => startTransition(async () => { await setDayComplete(day, !isComplete); setComplete(!isComplete); })}>
          {pending ? <Loader2 size={17} className="animate-spin" /> : <Check size={17} />} {isComplete ? "Día completado" : "Marcar como completado"}
        </button>
        <button className="secondary-button" disabled={pending} onClick={() => startTransition(async () => { const value = await toggleFavorite("journey", `day-${String(day).padStart(2,"0")}`); setFavorite(value); })}>
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"}/> {isFavorite ? "Guardado" : "Guardar"}
        </button>
      </div>
      <div className="app-card p-5">
        <label className="label" htmlFor="day-note">Tus notas privadas</label>
        <textarea id="day-note" className="field" value={note} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="Escribe lo que quieres recordar de este día…" />
        <div className="mt-3 flex items-center justify-between gap-3"><span className="text-xs text-muted">Solo tú puedes ver esta nota.</span><button className="secondary-button" disabled={pending} onClick={() => startTransition(async () => { await saveDayNote(day, note); setSaved(true); })}>{pending ? <Loader2 size={16} className="animate-spin"/> : <Save size={16}/>} {saved ? "Guardado" : "Guardar nota"}</button></div>
      </div>
    </div>
  );
}
