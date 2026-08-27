"use client";

import { Lightbulb, Plus, Tag } from "lucide-react";
import { useState, useTransition } from "react";
import type { JournalEntry } from "@/generated/prisma-v2";
import { saveJournalEntry } from "@/app/app/actions";

const MOOD_OPTIONS = [
  { value: "feliz", emoji: "😊", label: "Feliz" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "triste", emoji: "😔", label: "Triste" },
  { value: "angustiada", emoji: "😢", label: "Angustiada" },
  { value: "orando", emoji: "🙏", label: "Orando" },
];

const PROMPTS: string[][] = [
  ["¿Qué sentí hoy que no expresé?", "¿Hubo un momento de conexión?", "¿Qué necesito mañana?"],
  ["¿Qué me hizo sonreír hoy?", "¿Qué aprendí de mí misma?", "¿Dónde vi a Dios hoy?"],
  ["¿Qué me pesó y por qué?", "¿Qué boundary necesité y no marqué?", "¿Por qué estoy agradecida?"],
  ["¿Qué conversación me dolió?", "¿Qué hice bien a pesar del cansancio?", "¿Qué puedo soltar hoy?"],
  ["¿Qué estaba evitando?", "¿Qué necesito perdonar?", "¿Qué pequeño paso puedo dar?"],
  ["¿Cómo estoy cuidando mi cuerpo?", "¿Qué me desconectó de mi pareja?", "¿Qué oración necesito?"],
  ["¿Qué me dejó en paz?", "¿Qué necesito pedir perdón?", "¿Qué esperanza tengo para mañana?"],
];


export function JournalForm({
  editing,
  presetTags,
}: {
  editing: JournalEntry | null;
  presetTags: string[];
}) {
  function dateInputFn(date?: Date) { return (date ?? new Date()).toISOString().slice(0, 10); }
  const [mood, setMood] = useState(editing?.mood ?? "");
  const [selectedTags, setSelectedTags] = useState<string[]>(editing?.tags ? JSON.parse(editing.tags) : []);
  const [selectedPrompt, setSelectedPrompt] = useState(editing?.prompt ?? "");
  const [pending, startTransition] = useTransition();

  const dayOfWeek = new Date().getDay();
  const dayPrompts = PROMPTS[dayOfWeek % PROMPTS.length];

  function toggleTag(tag: string) {
    setSelectedTags(current => current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag]);
  }

  async function handleSubmit(form: HTMLFormElement) {
    const formData = new FormData(form);
    formData.set("mood", mood);
    formData.set("tags", JSON.stringify(selectedTags));
    formData.set("prompt", selectedPrompt);
    startTransition(async () => {
      await saveJournalEntry(formData);
      if (!editing) {
        form.reset();
        setMood("");
        setSelectedTags([]);
        setSelectedPrompt("");
      }
    });
  }

  return (
    <form action={saveJournalEntry} className="surface h-fit p-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(e.currentTarget); }}>
      {/* Guided prompts */}
      <div className="rounded-xl bg-[#f4eee4] p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#934731]"><Lightbulb size={14}/> Reflexiones de hoy</p>
        <div className="mt-3 space-y-2">
          {dayPrompts.map(prompt => (
            <button key={prompt} type="button" onClick={() => setSelectedPrompt(prompt)} className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${selectedPrompt === prompt ? "border-[#B85C42] bg-[#fff4ee] font-medium" : "border-[#ddd3c6] bg-white text-muted hover:bg-[#f4eee4]"}`}>{prompt}</button>
          ))}
        </div>
      </div>

      {/* Mood selection */}
      <div className="mt-5">
        <label className="label">¿Cómo estás hoy?</label>
        <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Seleccionar estado de ánimo">
          {MOOD_OPTIONS.map(opt => (
            <button key={opt.value} type="button" onClick={() => setMood(opt.value)} role="radio" aria-checked={mood === opt.value} aria-label={opt.label} className={`grid size-10 place-items-center rounded-xl border text-xl transition ${mood === opt.value ? "border-[#B85C42] bg-[#fff4ee] scale-110" : "border-[#ddd3c6] bg-[#fffdf8] hover:bg-[#f4eee4]"}`}>{opt.emoji}</button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5"><h2 className="text-lg font-semibold">{editing ? "Editar entrada" : "Nueva entrada"}</h2>{editing ? <a href="/app/diario" className="text-sm font-semibold text-[#934731]">Cancelar</a> : <Plus size={18} className="text-[#B85C42]"/>}</div>
      {editing ? <input type="hidden" name="id" value={editing.id}/> : null}
      <input type="hidden" name="mood" value={mood} />
      <input type="hidden" name="tags" value={JSON.stringify(selectedTags)} />
      <input type="hidden" name="prompt" value={selectedPrompt} />

      <div className="mt-5"><label className="label" htmlFor="entryDate">Fecha</label><input className="field" id="entryDate" name="entryDate" type="date" defaultValue={dateInputFn(editing?.entryDate)} required/></div>
      <div className="mt-4"><label className="label" htmlFor="title">Título</label><input className="field" id="title" name="title" defaultValue={editing?.title ?? ""} maxLength={120} placeholder="Lo que quiero recordar" required/></div>
      <div className="mt-4"><label className="label" htmlFor="body">Escribe con libertad</label><textarea className="field" id="body" name="body" defaultValue={editing?.body ?? ""} maxLength={12000} placeholder="Hoy noté que…" required/></div>

      {/* Tags */}
      <div className="mt-4">
        <label className="label"><Tag size={13}/> Etiquetas (opcional)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {presetTags.map(tag => (
            <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`rounded-full border px-3 py-1 text-xs font-medium transition ${selectedTags.includes(tag) ? "border-[#547055] bg-[#e4e9df] text-[#547055]" : "border-[#ddd3c6] bg-[#fffdf8] text-muted hover:bg-[#f4eee4]"}`}>{tag}</button>
          ))}
        </div>
      </div>

      <button className="primary-button mt-5" type="submit" disabled={pending}>{editing ? "Guardar cambios" : "Guardar entrada"}</button>
    </form>
  );
}
