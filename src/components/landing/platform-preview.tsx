import { Check, ChevronRight, Flame, Heart, Sparkles } from "lucide-react";

const days = [
  { day: "L", done: true },
  { day: "M", done: true },
  { day: "M", done: true },
  { day: "J", done: true },
  { day: "V", done: false },
  { day: "S", done: false },
  { day: "D", done: false },
];

export function PlatformPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]" aria-label="Vista previa ilustrativa de la plataforma Nexo 21">
      <div className="absolute -left-4 top-12 h-28 w-28 rounded-full bg-[#B85C42]/15 blur-2xl sm:-left-10" />
      <div className="absolute -right-2 bottom-10 h-36 w-36 rounded-full bg-[#74836B]/20 blur-2xl sm:-right-10" />

      <div className="relative overflow-hidden rounded-[26px] border border-[#25231F]/12 bg-[#FFFDF8] shadow-[0_30px_80px_rgba(37,35,31,0.15)] sm:rounded-[32px]">
        <div className="flex items-center justify-between border-b border-[#25231F]/8 px-4 py-3 sm:px-6">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#B85C42]/70" />
            <span className="size-2 rounded-full bg-[#D7B56D]/70" />
            <span className="size-2 rounded-full bg-[#74836B]/70" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#25231F]/45 sm:text-[10px]">
            Tu espacio compartido
          </span>
          <span className="rounded-full bg-[#74836B]/10 px-2 py-1 text-[9px] font-bold text-[#74836B]">
            Día 04
          </span>
        </div>

        <div className="grid sm:grid-cols-[0.82fr_1.18fr]">
          <aside className="hidden border-r border-[#25231F]/8 bg-[#F5F1E8]/60 p-5 sm:block">
            <div className="mb-7 flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-[#B85C42] text-white">
                <Heart className="size-3.5" fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#25231F]">Nuestro Nexo</p>
                <p className="text-[8px] text-[#25231F]/45">21 días para volver</p>
              </div>
            </div>
            <nav className="space-y-2" aria-label="Navegación ilustrativa">
              {["Hoy", "Nuestro mapa", "Conversaciones", "Caja de calma"].map((item, index) => (
                <div
                  key={item}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[10px] ${
                    index === 0
                      ? "bg-white font-bold text-[#B85C42] shadow-sm"
                      : "text-[#25231F]/55"
                  }`}
                >
                  {item}
                  {index === 0 ? <ChevronRight className="size-3" /> : null}
                </div>
              ))}
            </nav>
            <div className="mt-8 rounded-2xl border border-[#74836B]/20 bg-[#74836B]/8 p-3">
              <p className="mb-1 text-[8px] font-bold uppercase tracking-wider text-[#74836B]">Racha consciente</p>
              <div className="flex items-end gap-1.5 text-[#25231F]">
                <Flame className="size-4 text-[#B85C42]" />
                <strong className="text-lg leading-none">4</strong>
                <span className="text-[8px] text-[#25231F]/50">encuentros</span>
              </div>
            </div>
          </aside>

          <div className="p-4 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#B85C42]">Hoy · Conexión</p>
                <h3 className="font-[Georgia,serif] text-xl leading-tight text-[#25231F] sm:text-2xl">
                  Escuchar sin preparar una defensa
                </h3>
              </div>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#D7B56D]/16 text-[#9A7533]">
                <Sparkles className="size-4" />
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-[#25231F]/8 bg-white p-4 shadow-[0_8px_22px_rgba(37,35,31,0.05)]">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#25231F]/45">Práctica de 8 min</span>
                <span className="rounded-full bg-[#B85C42]/10 px-2 py-1 text-[8px] font-bold text-[#B85C42]">Juntos</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#25231F]/70 sm:text-xs">
                Completen esta frase por turnos: “Últimamente, me he sentido más cerca de ti cuando…”
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#25231F]/6">
                <div className="h-full w-[38%] rounded-full bg-[#B85C42]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#74836B]/10 p-3.5">
                <p className="text-[8px] font-bold uppercase tracking-wider text-[#74836B]">Pregunta puente</p>
                <p className="mt-2 text-[10px] leading-relaxed text-[#25231F]/65">¿Qué necesitas que entienda, no que resuelva?</p>
              </div>
              <div className="rounded-2xl bg-[#B85C42]/8 p-3.5">
                <p className="text-[8px] font-bold uppercase tracking-wider text-[#B85C42]">Acuerdo mínimo</p>
                <p className="mt-2 text-[10px] leading-relaxed text-[#25231F]/65">Una acción pequeña para cuidar el vínculo hoy.</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#25231F]/8 pt-4">
              {days.map((item, index) => (
                <div key={`${item.day}-${index}`} className="text-center">
                  <span
                    className={`mx-auto flex size-6 items-center justify-center rounded-full text-[8px] font-bold sm:size-7 ${
                      item.done
                        ? "bg-[#74836B] text-white"
                        : "border border-[#25231F]/12 text-[#25231F]/35"
                    }`}
                  >
                    {item.done ? <Check className="size-3" /> : index + 1}
                  </span>
                  <span className="mt-1 block text-[7px] text-[#25231F]/35">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-[#25231F]/10 bg-[#FFFDF8] px-4 py-3 shadow-xl sm:block">
        <p className="text-[9px] font-bold uppercase tracking-wider text-[#74836B]">Sin presión</p>
        <p className="mt-0.5 text-xs text-[#25231F]">A su ritmo, desde cualquier lugar.</p>
      </div>
    </div>
  );
}
