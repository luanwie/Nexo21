import {
  ArrowDown,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  CircleCheck,
  Clock3,
  Compass,
  Feather,
  Gift,
  HandHeart,

  Layers3,
  LockKeyhole,
  MessageCircleHeart,
  MessagesSquare,
  NotebookPen,
  Pause,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Target,
  WandSparkles,
} from "lucide-react";
import { BrandMark } from "./brand-mark";
import { PlatformPreview } from "./platform-preview";
import { TrackedCta } from "./tracked-cta";
import { WomanJourneyPreview } from "./woman-journey-preview";

const identifyCards = [
  {
    icon: MessagesSquare,
    title: "Te sientes sola aun estando casada",
    text: "Hay una relación, una rutina y muchas responsabilidades, pero hace tiempo que tú no te sientes realmente escuchada.",
  },
  {
    icon: Clock3,
    title: "Te dejaste al final de la lista",
    text: "Cuidas la casa, el trabajo, la familia y el vínculo, mientras tu propia voz queda para después.",
  },
  {
    icon: RefreshCcw,
    title: "Quieres actuar con fe sin desaparecerte",
    text: "Buscas amar con sabiduría, pero no quieres confundir fe con culpa, silencio, autoabandono o falta de límites.",
  },
];

const calmaSteps = [
  {
    letter: "C",
    name: "Comprender",
    text: "Observar el ciclo sin convertir una interpretación apresurada en un hecho ni buscar culpables.",
  },
  {
    letter: "A",
    name: "Aquietar",
    text: "Reducir la reactividad antes de hablar para responder con mayor claridad y cuidado.",
  },
  {
    letter: "L",
    name: "Localizar",
    text: "Nombrar la emoción, la necesidad y la parte de la situación que realmente está bajo tu cuidado.",
  },
  {
    letter: "M",
    name: "Mirar al otro",
    text: "Escuchar su experiencia sin borrar tu voz, adivinar intenciones ni justificar aquello que hace daño.",
  },
  {
    letter: "A",
    name: "Actuar pequeño",
    text: "Elegir una acción concreta, respetuosa y sostenible, sin intentar controlar la respuesta de tu pareja.",
  },
];

const benefits = [
  "Distinguir hechos, interpretaciones y emociones antes de reaccionar",
  "Expresar necesidades sin borrar tu voz ni atacar",
  "Reconocer qué está bajo tu cuidado y qué no te corresponde cargar",
  "Sostener límites claros cuando una conversación deja de ser respetuosa",
  "Preparar conversaciones difíciles con más calma y discernimiento",
  "Construir hábitos de presencia que no dependan de la perfección",
];

const tools = [
  {
    icon: Pause,
    title: "Pausa guiada",
    text: "Un protocolo simple para detener la escalada sin abandonar la conversación.",
  },
  {
    icon: MessageCircleHeart,
    title: "Preguntas puente",
    text: "Prompts pensados para descubrir lo que hay debajo de una respuesta automática.",
  },
  {
    icon: Compass,
    title: "Mapa del patrón",
    text: "Una lectura visual del ciclo que se repite, sin buscar culpables ni asumir toda la responsabilidad.",
  },
  {
    icon: NotebookPen,
    title: "Bitácora de conexión",
    text: "Notas breves para observar avances, detonantes y gestos que hacen bien.",
  },
  {
    icon: HandHeart,
    title: "Reparaciones pequeñas",
    text: "Frases y acciones para retomar el contacto cuando algo salió mal.",
  },
  {
    icon: Target,
    title: "Acuerdos mínimos",
    text: "Compromisos claros, realistas y revisables para convertir intención en cuidado.",
  },
];

const weeks = [
  {
    number: "01",
    eyebrow: "Días 1–7",
    title: "Bajar el ruido",
    text: "Observar tus patrones, reducir la reactividad y reconocer lo que realmente está bajo tu cuidado.",
    items: ["Hechos e interpretaciones", "Emociones y necesidades", "Límites y seguridad"],
    color: "#B85C42",
  },
  {
    number: "02",
    eyebrow: "Días 8–14",
    title: "Volver a verse",
    text: "Practicar escucha, pedidos claros y conversaciones honestas sin renunciar a tu perspectiva.",
    items: ["Gratitud específica", "Peticiones claras", "Validar sin desaparecerte"],
    color: "#74836B",
  },
  {
    number: "03",
    eyebrow: "Días 15–21",
    title: "Cuidar lo que sigue",
    text: "Convertir lo aprendido en límites sostenibles, decisiones conscientes y una continuidad posible.",
    items: ["Cuidado personal", "Decisiones compartidas", "Plan de continuidad"],
    color: "#9A7533",
  },
];

const faqs = [
  {
    question: "¿Mi pareja tiene que participar?",
    answer:
      "No. Nexo 21 está diseñado para que realices la jornada de forma individual. Algunas prácticas pueden compartirse si existe disposición y seguridad, pero tu acceso y avance no dependen de que tu pareja participe.",
  },
  {
    question: "¿Cuánto tiempo necesito por día?",
    answer:
      "La mayoría de las prácticas toma entre 15 y 25 minutos. Puedes avanzar a tu ritmo y retomar sin perder el progreso.",
  },
  {
    question: "¿Sirve si estamos en una etapa difícil?",
    answer:
      "Nexo 21 puede ayudarte a ordenar lo que está bajo tu cuidado cuando existe seguridad. No sustituye terapia, atención clínica ni apoyo profesional, y nunca debe usarse para enfrentar a una persona agresora.",
  },
  {
    question: "¿Y si perdemos un día?",
    answer:
      "No hay penalizaciones ni una carrera que ganar. Puedes retomar donde quedaste. La consistencia amable suele ser más sostenible que la exigencia perfecta.",
  },
  {
    question: "¿Qué recibo al comprar?",
    answer:
      "Acceso digital a 21 días guiados, diario privado, 150 mensajes, 30 conversaciones, 100 pequeñas acciones, devocionales, oraciones, favoritos y un plan de continuidad de 30 días.",
  },
  {
    question: "¿Cómo funciona la garantía?",
    answer:
      "Tienes 15 días desde la compra para explorar el material. Si consideras que no es para ti, puedes solicitar el reembolso dentro de ese plazo respondiendo al email de confirmación.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#934731]">
        {eyebrow}
      </p>
      <h2 className="font-[Georgia,serif] text-[2rem] leading-[1.08] tracking-[-0.025em] text-[#25231F] sm:text-4xl lg:text-[3.25rem]">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 text-base leading-7 text-[#25231F]/65 sm:text-lg sm:leading-8">
          {text}
        </p>
      ) : null}
    </div>
  );
}

function BotanicalLine() {
  return (
    <svg aria-hidden="true" viewBox="0 0 180 52" fill="none" className="h-10 w-32 text-[#547055]/45 sm:w-40">
      <path d="M6 39C52 39 75 14 111 14C133 14 149 26 174 26" stroke="currentColor" strokeWidth="1" />
      <path d="M57 30C52 20 54 14 64 9C68 19 66 25 57 30Z" stroke="currentColor" strokeWidth="1" />
      <path d="M97 16C94 6 99 2 110 3C110 12 106 16 97 16Z" stroke="currentColor" strokeWidth="1" />
      <path d="M134 18C140 9 147 9 155 16C149 23 143 24 134 18Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F5F1E8] [font-family:var(--font-geist-sans)] text-[#25231F] selection:bg-[#B85C42]/20">
      <nav className="relative z-50 border-b border-[#25231F]/8 bg-[#F5F1E8]/90 backdrop-blur-md" aria-label="Navegación principal">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" aria-label="Nexo 21, volver al inicio" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B85C42]">
            <BrandMark />
          </a>
          <div className="hidden items-center gap-7 text-xs font-semibold text-[#25231F]/65 md:flex">
            <a className="transition hover:text-[#934731]" href="#metodo">Método</a>
            <a className="transition hover:text-[#934731]" href="#recorrido">Recorrido</a>
            <a className="transition hover:text-[#934731]" href="#plataforma">Plataforma</a>
            <a className="transition hover:text-[#934731]" href="#faq">Preguntas</a>
          </div>
          <TrackedCta source="nav" className="min-h-10 px-4 py-2 text-xs sm:px-5" showArrow={false}>
            Empezar por US$9.90
          </TrackedCta>
        </div>
      </nav>

      <main>
        <section id="inicio" className="relative isolate overflow-hidden px-5 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:px-10 lg:pb-32 lg:pt-20">
          <div className="absolute inset-0 -z-20 [background-image:radial-gradient(circle_at_15%_10%,rgba(184,92,66,0.13),transparent_25%),radial-gradient(circle_at_85%_72%,rgba(116,131,107,0.16),transparent_30%)]" />
          <div aria-hidden="true" className="absolute -right-32 top-10 -z-10 size-[430px] rounded-full border border-[#74836B]/15 sm:-right-20 sm:size-[560px]" />
          <div aria-hidden="true" className="absolute -right-16 top-28 -z-10 size-[300px] rounded-full border border-[#74836B]/10 sm:size-[420px]" />

          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B85C42]/20 bg-[#FFFDF8]/75 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#934731] shadow-sm sm:text-xs">
                <span className="size-1.5 rounded-full bg-[#B85C42]" />
                Jornada cristiana para mujeres casadas
              </div>
              <h1 className="font-[Georgia,serif] text-[2.75rem] leading-[0.98] tracking-[-0.045em] text-[#25231F] sm:text-6xl lg:text-[4.6rem]">
                Tu matrimonio importa.
                <span className="mt-2 block text-[#934731] italic">Tu voz, tu paz y tus límites también.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#25231F]/68 sm:text-xl sm:leading-9">
                Nexo 21 es una jornada cristiana individual de 21 días para volver a escucharte,
                comprender lo que vives y practicar formas más claras de hablar, cuidar y poner límites sin cargar sola con toda la relación.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <TrackedCta source="hero" className="min-h-14 px-7 text-base sm:min-w-[250px]">
                  Quiero comenzar mi jornada
                </TrackedCta>
                <a
                  href="#metodo"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold text-[#25231F]/65 transition hover:text-[#934731] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B85C42]"
                >
                  Ver cómo funciona <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#25231F]/55">
                {["Prácticas de 15–25 min", "Avance individual", "Garantía de 15 días"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CircleCheck className="size-3.5 text-[#547055]" aria-hidden="true" /> {item}
                  </span>
                ))}
              </div>
            </div>

            <WomanJourneyPreview />
          </div>
        </section>

        <section className="border-y border-[#25231F]/8 bg-[#FFFDF8] px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Tal vez esto se parece a tu historia"
              title={<>Has intentado cuidar el vínculo. Pero también necesitas <em className="text-[#547055]">un lugar para ti.</em></>}
              text="La distancia no solo aparece entre dos personas. También aparece cuando dejas de reconocer lo que sientes, lo que necesitas y los límites que deseas cuidar."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {identifyCards.map(({ icon: Icon, title, text }, index) => (
                <article key={title} className="group rounded-[26px] border border-[#25231F]/10 bg-[#F5F1E8]/55 p-6 transition duration-300 hover:-translate-y-1 hover:bg-[#F5F1E8] sm:p-7">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-full bg-[#B85C42]/10 text-[#934731] transition group-hover:bg-[#B85C42] group-hover:text-white">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-[Georgia,serif] text-3xl text-[#25231F]/10">0{index + 1}</span>
                  </div>
                  <h3 className="font-[Georgia,serif] text-2xl text-[#25231F]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#25231F]/62">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#25231F] px-5 py-20 text-[#F5F1E8] sm:px-8 sm:py-28 lg:px-10">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,rgba(184,92,66,0.65),transparent_25%),radial-gradient(circle_at_80%_75%,rgba(116,131,107,0.75),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D99A84]">No estás fallando por no poder cambiarlo todo</p>
              <h2 className="font-[Georgia,serif] text-[2.15rem] leading-[1.08] tracking-[-0.025em] sm:text-5xl">
                Amar con sabiduría no significa asumir sola la responsabilidad por cada silencio, conflicto o distancia.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm sm:p-7">
                <Brain className="mb-5 size-6 text-[#D99A84]" aria-hidden="true" />
                <h3 className="font-[Georgia,serif] text-xl">Cuando tu sistema se activa</h3>
                <p className="mt-3 text-sm leading-7 text-[#F5F1E8]/60">
                  Puedes insistir, callar, complacer o defenderte para proteger el vínculo. La reacción tiene sentido, pero no siempre te acerca a la mujer que deseas ser.
                </p>
              </div>
              <div className="rounded-[26px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-sm sm:p-7">
                <Layers3 className="mb-5 size-6 text-[#AAB7A3]" aria-hidden="true" />
                <h3 className="font-[Georgia,serif] text-xl">Lo que sí puedes cuidar</h3>
                <p className="mt-3 text-sm leading-7 text-[#F5F1E8]/60">
                  Tu claridad, tus palabras, tus decisiones, tu cuidado personal y tus límites. La respuesta de tu pareja sigue siendo responsabilidad de él.
                </p>
              </div>
              <div className="sm:col-span-2 rounded-[26px] border border-[#D7B56D]/20 bg-[#D7B56D]/[0.07] p-6 sm:p-7">
                <p className="font-[Georgia,serif] text-xl italic leading-relaxed text-[#F5F1E8]/90 sm:text-2xl">
                  Nexo 21 te ayuda a reconocer el ciclo, cuidar tu respuesta y hablar con mayor verdad, sin prometer controlar ni cambiar a tu pareja.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="El mecanismo"
              title={<>C.A.L.M.A.: cinco movimientos para <em className="text-[#934731]">volver a tu centro</em></>}
              text="Antes de pedir más comunicación, practicas condiciones internas y límites para hablar con mayor claridad cuando hacerlo es seguro."
            />
            <div className="relative mt-14 grid gap-3 lg:grid-cols-5">
              <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-9 hidden border-t border-dashed border-[#25231F]/18 lg:block" />
              {calmaSteps.map((step, index) => (
                <article key={step.name} className="relative flex gap-4 rounded-2xl border border-[#25231F]/8 bg-[#FFFDF8]/70 p-5 lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:text-center">
                  <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-[#B85C42]/25 bg-[#F5F1E8] font-[Georgia,serif] text-2xl text-[#934731] shadow-[0_0_0_8px_#F5F1E8] lg:mx-auto lg:size-[72px] lg:text-3xl">
                    {step.letter}
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-[#25231F] text-[8px] font-bold text-white">{index + 1}</span>
                  </div>
                  <div className="lg:mt-7">
                    <h3 className="font-[Georgia,serif] text-xl text-[#25231F]">{step.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#25231F]/60">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#74836B] px-6 py-12 text-[#FFFDF8] sm:rounded-[44px] sm:px-12 sm:py-16 lg:px-20">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#E0E8DC]">Una nueva oportunidad</p>
                <h2 className="font-[Georgia,serif] text-4xl leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                  No se trata de convertirte en otra mujer para merecer amor.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                  Se trata de habitar tu fe, tu voz y tus límites con mayor conciencia, mientras construyes formas más honestas de relacionarte con lo que hoy es real.
                </p>
              </div>
              <div className="relative rounded-[28px] border border-white/15 bg-white/[0.08] p-6 sm:p-8">
                <WandSparkles className="mb-5 size-7 text-[#F0D8A5]" aria-hidden="true" />
                <p className="font-[Georgia,serif] text-2xl italic leading-relaxed sm:text-3xl">
                  “La oportunidad no es borrar la historia. Es dejar de repetirla sin elegir.”
                </p>
                <div className="mt-6"><BotanicalLine /></div>
              </div>
            </div>
          </div>
        </section>

        <section id="recorrido" className="border-y border-[#25231F]/8 bg-[#FFFDF8] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="21 días · 3 semanas"
              title={<>Un paso al día. Un nuevo lenguaje para <em className="text-[#547055]">habitar tu relación sin perderte.</em></>}
              text="El recorrido avanza de la conciencia personal a conversaciones más claras y, después, a límites y hábitos sostenibles. Cada semana prepara la siguiente."
            />
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {weeks.map((week) => (
                <article key={week.number} className="relative overflow-hidden rounded-[28px] border border-[#25231F]/10 bg-[#F5F1E8]/65 p-7 sm:p-8">
                  <div className="absolute -right-3 -top-7 font-[Georgia,serif] text-[8rem] leading-none text-[#25231F]/[0.035]">{week.number}</div>
                  <div className="relative">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="font-[Georgia,serif] text-5xl" style={{ color: week.color }}>{week.number}</span>
                      <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#25231F]/50">{week.eyebrow}</span>
                    </div>
                    <h3 className="font-[Georgia,serif] text-3xl text-[#25231F]">{week.title}</h3>
                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#25231F]/60">{week.text}</p>
                    <ul className="mt-6 space-y-3 border-t border-[#25231F]/10 pt-6">
                      {week.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-[#25231F]/75">
                          <span className="flex size-5 items-center justify-center rounded-full text-white" style={{ backgroundColor: week.color }}>
                            <Check className="size-3" aria-hidden="true" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-10 text-center">
              <TrackedCta source="21-days">Empezar mi día 1</TrackedCta>
            </div>
          </div>
        </section>

        <section id="plataforma" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Todo en un solo lugar"
                title={<>Una plataforma serena para conversaciones que <em className="text-[#934731]">sí importan.</em></>}
                text="Sin hojas sueltas ni instrucciones confusas. Abres el día, sigues la guía y guardas lo que descubres."
              />
              <ul className="mt-8 space-y-4">
                {["Ruta diaria clara y breve", "Prácticas individuales", "Progreso visible sin presión", "Acceso desde móvil, tablet o computadora"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold text-[#25231F]/75 sm:text-base">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#74836B]/12 text-[#547055]"><Check className="size-3.5" /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <PlatformPreview />
          </div>
        </section>

        <section className="bg-[#EAE3D6] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Lo que puedes empezar a construir"
              title="Menos reacción. Más claridad. Más presencia."
              text="No prometemos ausencia de conflictos. Recibes una estructura para cuidar tu respuesta, tus límites y tus conversaciones con más conciencia."
            />
            <div className="mt-12 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={benefit} className="flex items-start gap-4 border-b border-[#25231F]/10 py-5">
                  <span className="font-[Georgia,serif] text-sm text-[#934731]">0{index + 1}</span>
                  <p className="font-[Georgia,serif] text-xl leading-snug text-[#25231F] sm:text-2xl">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="La caja de herramientas"
              title={<>Recursos para usar durante los 21 días <em className="text-[#547055]">y después.</em></>}
              text="Herramientas simples, concretas y fáciles de recuperar cuando una conversación se pone difícil."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map(({ icon: Icon, title, text }) => (
                <article key={title} className="rounded-[24px] border border-[#25231F]/9 bg-[#FFFDF8]/75 p-6 transition hover:border-[#74836B]/35 hover:shadow-[0_16px_40px_rgba(37,35,31,0.07)] sm:p-7">
                  <Icon className="size-6 text-[#934731]" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="mt-7 font-[Georgia,serif] text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#25231F]/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[#25231F]/8 bg-[#FFFDF8] px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Contenido del recorrido"
                  title="Una secuencia diseñada para acompañar, no abrumar."
                  text="Cada día combina una idea breve, una práctica guiada y un cierre que aterriza lo aprendido en la vida cotidiana."
                />
                <div className="mt-8 flex items-center gap-4 rounded-2xl bg-[#F5F1E8] p-4">
                  <CalendarDays className="size-7 text-[#934731]" />
                  <div>
                    <p className="text-sm font-bold">21 experiencias guiadas</p>
                    <p className="mt-0.5 text-xs text-[#25231F]/50">Lectura + práctica + integración</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {weeks.map((week, index) => (
                  <article key={week.title} className="grid gap-5 rounded-[24px] border border-[#25231F]/9 bg-[#F5F1E8]/55 p-5 sm:grid-cols-[80px_1fr] sm:p-6">
                    <div className="flex size-14 items-center justify-center rounded-full font-[Georgia,serif] text-2xl text-white sm:size-16" style={{ backgroundColor: week.color }}>{index + 1}</div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <h3 className="font-[Georgia,serif] text-2xl">Semana {index + 1}: {week.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#25231F]/40">{week.eyebrow}</span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#25231F]/60">{week.text}</p>
                    </div>
                  </article>
                ))}
                <div className="grid gap-3 pt-2 sm:grid-cols-3">
                  {["Lecturas sustanciales", "Prácticas y checklists", "Espacio de notas privadas"].map((item) => (
                    <div key={item} className="rounded-2xl border border-[#74836B]/16 bg-[#74836B]/7 px-4 py-3 text-xs font-semibold text-[#547055]">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Bibliotecas incluidas"
              title={<>Recursos prácticos dentro de tu acceso, <em className="text-[#934731]">sin compras adicionales.</em></>}
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {[
                { icon: BookOpen, label: "Biblioteca 01", title: "150 mensajes con intención", text: "Mensajes originales con filtros por sentimiento, contexto y objetivo, listos para adaptar a tu propia voz." },
                { icon: ShieldCheck, label: "Biblioteca 02", title: "30 conversaciones guiadas", text: "Preparación, aperturas, frases útiles, preguntas, cierres y alertas de seguridad para temas difíciles." },
                { icon: Sparkles, label: "Biblioteca 03", title: "100 pequeñas acciones", text: "Acciones categorizadas y concretas para practicar cuidado sin depender de grandes gestos." },
              ].map(({ icon: Icon, label, title, text }) => (
                <article key={label} className="relative overflow-hidden rounded-[28px] border border-[#25231F]/10 bg-[#FFFDF8] p-7 sm:p-8">
                  <span className="absolute right-5 top-5 font-[Georgia,serif] text-6xl text-[#25231F]/[0.035]">+</span>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[#B85C42]/10 text-[#934731]"><Icon className="size-6" strokeWidth={1.6} /></div>
                  <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-[#547055]">{label}</p>
                  <h3 className="mt-2 font-[Georgia,serif] text-2xl leading-tight">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#25231F]/60">{text}</p>
                  <p className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#934731]"><Gift className="size-4" /> Incluido</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="oferta" className="bg-[#25231F] px-5 py-20 text-[#F5F1E8] sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#D99A84]">Una decisión pequeña. Un espacio distinto.</p>
              <h2 className="font-[Georgia,serif] text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Tu matrimonio importa. Tu bienestar y tu voz también.
              </h2>
              <p className="mt-6 text-base leading-8 text-[#F5F1E8]/62 sm:text-lg">
                Empieza con un día, una reflexión y una acción que sí depende de ti.
              </p>
            </div>

            <div className="relative rounded-[32px] bg-[#FFFDF8] p-6 text-[#25231F] shadow-[0_35px_90px_rgba(0,0,0,0.28)] sm:p-10">
              <span className="absolute right-5 top-5 rounded-full bg-[#74836B]/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#547055]">Acceso digital</span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#934731]">Nexo 21 completo</p>
              <div className="mt-5 flex items-end gap-2">
                <span className="pb-2 text-base font-bold text-[#25231F]/45">US$</span>
                <span className="font-[Georgia,serif] text-7xl leading-none tracking-[-0.05em]">9.90</span>
              </div>
              <p className="mt-3 text-sm text-[#25231F]/55">Pago único · sin suscripción</p>
              <div className="my-7 h-px bg-[#25231F]/10" />
              <ul className="space-y-3">
                {["Recorrido completo de 21 días", "Método C.A.L.M.A. paso a paso", "Diario privado y progreso", "150 mensajes y 30 conversaciones", "100 acciones, devocionales y oraciones", "Continuidad de 30 días y garantía de 15 días"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#25231F]/75">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#74836B] text-white"><Check className="size-3" /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <TrackedCta source="offer" className="mt-8 w-full min-h-14 text-base">
                Acceder a Nexo 21
              </TrackedCta>
              <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] text-[#25231F]/45">
                <LockKeyhole className="size-3.5" /> Compra procesada en un entorno seguro
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#74836B] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
              <ShieldCheck className="size-9 text-[#F0D8A5]" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">Garantía simple de 15 días</p>
              <h2 className="mt-2 font-[Georgia,serif] text-3xl sm:text-4xl">Explora el recorrido con tranquilidad.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/68 sm:text-base">
                Si durante los primeros 15 días sientes que Nexo 21 no es para ti, puedes solicitar el reembolso respondiendo al email de confirmación de la compra.
              </p>
            </div>
          </div>
        </section>

        <section id="faq" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="Preguntas frecuentes" title="Lo importante, antes de empezar." />
            <div className="mt-12 divide-y divide-[#25231F]/10 border-y border-[#25231F]/10">
              {faqs.map((faq, index) => (
                <details key={faq.question} className="group py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-lg py-5 text-left focus-visible:outline-2 focus-visible:outline-[#B85C42] sm:py-6">
                    <span className="flex items-start gap-4">
                      <span className="pt-1 text-[10px] font-bold text-[#934731]">0{index + 1}</span>
                      <span className="font-[Georgia,serif] text-lg sm:text-xl">{faq.question}</span>
                    </span>
                    <span className="relative size-5 shrink-0 text-[#547055]">
                      <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <p className="pb-6 pl-9 pr-8 text-sm leading-7 text-[#25231F]/62 sm:text-base sm:leading-8">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[34px] bg-[#B85C42] px-6 py-14 text-center text-white sm:rounded-[48px] sm:px-12 sm:py-20">
            <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_100%,#F5F1E8,transparent_28%),radial-gradient(circle_at_90%_0%,#D7B56D,transparent_25%)]" />
            <div className="relative mx-auto max-w-3xl">
              <Feather className="mx-auto mb-6 size-8 text-[#F0D8A5]" strokeWidth={1.5} />
              <h2 className="font-[Georgia,serif] text-4xl leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Quizá no necesitas hacerlo todo hoy. Necesitas un lugar para comenzar.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                Abre ese espacio hoy. Un día, una práctica y una conversación a la vez.
              </p>
              <TrackedCta source="final-cta" variant="dark" className="mt-8 min-h-14 px-8 text-base">
                Empezar Nexo 21 por US$9.90
              </TrackedCta>
              <p className="mt-4 text-xs text-white/55">Pago único · acceso digital · 15 días de garantía</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#25231F] px-5 pb-8 pt-14 text-[#F5F1E8] sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-10 sm:flex-row sm:items-end">
            <div>
              <BrandMark inverted />
              <p className="mt-4 max-w-md text-sm leading-6 text-white/45">
                Un espacio educativo para cultivar conversaciones más conscientes, acuerdos más claros y una conexión más presente.
              </p>
            </div>
            <nav aria-label="Enlaces legales" className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-white/55">
              <a className="transition hover:text-white" href="/terminos">Términos</a>
              <a className="transition hover:text-white" href="/privacidad">Privacidad</a>
              <a className="transition hover:text-white" href="/soporte">Soporte</a>
            </nav>
          </div>
          <div className="grid gap-6 py-8 text-[11px] leading-5 text-white/38 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-4xl space-y-2">
              <p>
                Nexo 21 ofrece material educativo y de reflexión. No diagnostica, no ofrece tratamiento y no sustituye terapia individual o de pareja, atención médica ni servicios de emergencia.
              </p>
              <p>
                Si existe abuso, violencia, coerción o riesgo para tu integridad, prioriza la seguridad y busca ayuda profesional y servicios locales de emergencia. No utilices ejercicios conjuntos si hacerlo puede aumentar el riesgo.
              </p>
            </div>
            <p className="whitespace-nowrap">© 2026 Nexo 21</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
