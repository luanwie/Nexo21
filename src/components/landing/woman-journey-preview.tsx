import { Check, Feather, NotebookPen, ShieldCheck } from "lucide-react";

export function WomanJourneyPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] lg:ml-auto">
      <div className="relative aspect-[4/4.65] overflow-hidden rounded-t-[210px] rounded-b-[38px] border border-[#25231F]/10 bg-[#E7DED0] shadow-[0_35px_80px_rgba(37,35,31,0.16)]">
        <div className="absolute inset-0 [background-image:linear-gradient(145deg,rgba(255,255,255,0.52),transparent_42%),radial-gradient(circle_at_48%_27%,rgba(255,253,248,0.9),transparent_40%)]" />
        <svg aria-hidden="true" viewBox="0 0 500 580" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="womanDress" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#B85C42" />
              <stop offset="1" stopColor="#8E4534" />
            </linearGradient>
          </defs>
          <circle cx="250" cy="214" r="148" fill="none" stroke="#25231F" strokeOpacity=".07" />
          <circle cx="250" cy="214" r="108" fill="none" stroke="#25231F" strokeOpacity=".07" />
          <path d="M115 533C132 365 176 302 250 299C324 302 368 365 385 533Z" fill="url(#womanDress)" />
          <circle cx="250" cy="211" r="62" fill="#C98F70" />
          <path d="M187 212C182 140 236 118 279 142C317 163 315 219 299 254C297 190 272 164 230 166C207 175 196 190 187 212Z" fill="#332E2A" />
          <path d="M205 177C190 228 194 273 219 300" fill="none" stroke="#332E2A" strokeWidth="22" strokeLinecap="round" />
          <path d="M296 174C311 225 307 270 284 300" fill="none" stroke="#332E2A" strokeWidth="22" strokeLinecap="round" />
          <path d="M225 220C232 226 239 226 246 220M264 220C271 226 278 226 285 220" fill="none" stroke="#25231F" strokeOpacity=".5" strokeLinecap="round" />
          <path d="M239 250C247 256 256 256 264 250" fill="none" stroke="#934731" strokeWidth="2" strokeLinecap="round" />
          <path d="M173 443C215 421 279 421 327 445" fill="none" stroke="#FFFDF8" strokeOpacity=".7" strokeWidth="2" />
          <path d="M209 426L236 481M291 426L263 481" stroke="#C98F70" strokeWidth="20" strokeLinecap="round" />
          <rect x="194" y="470" width="112" height="61" rx="8" fill="#FFFDF8" transform="rotate(-4 194 470)" />
          <path d="M211 489H281M211 503H270" stroke="#74836B" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
        </svg>

        <div className="absolute left-5 top-[47%] w-[58%] rounded-2xl border border-white/45 bg-[#FFFDF8]/90 p-4 shadow-xl backdrop-blur-md sm:left-7 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#934731]">Mi jornada</p>
            <span className="rounded-full bg-[#e4e9df] px-2 py-1 text-[9px] font-bold text-[#547055]">Día 4 de 21</span>
          </div>
          <p className="mt-3 font-[Georgia,serif] text-base leading-snug text-[#25231F] sm:text-lg">Distinguir hechos de interpretaciones</p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E8DFD1]"><div className="h-full w-[19%] rounded-full bg-[#B85C42]" /></div>
          <p className="mt-2 text-[10px] text-[#6E675F]">Tu progreso queda guardado</p>
        </div>
      </div>

      <div className="absolute -right-2 bottom-8 w-[52%] rounded-2xl border border-[#25231F]/10 bg-[#FFFDF8] p-4 shadow-xl sm:-right-5 sm:p-5">
        <div className="flex items-center gap-2 text-[#547055]"><NotebookPen size={17} aria-hidden /><span className="text-[10px] font-bold uppercase tracking-[.14em]">Nota privada</span></div>
        <p className="mt-2 text-xs leading-5 text-[#25231F]/70">“Hoy quiero responder sin abandonar mi voz.”</p>
        <p className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-[#547055]"><Check size={12} aria-hidden /> Guardada para ti</p>
      </div>

      <div className="absolute -left-3 top-20 hidden rounded-2xl border border-[#25231F]/10 bg-[#FFFDF8] p-3 shadow-xl sm:block">
        <ShieldCheck className="size-5 text-[#934731]" aria-hidden />
      </div>
      <div className="absolute right-8 top-8 hidden rounded-full bg-[#FFFDF8]/90 p-3 text-[#B99255] shadow-lg sm:block"><Feather size={18} aria-hidden /></div>
    </div>
  );
}
