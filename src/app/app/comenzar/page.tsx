import Link from "next/link";
import { ArrowRight, CircleAlert, Clock3, Compass, HeartHandshake, ShieldCheck } from "lucide-react";
import { requireEntitlement } from "@/lib/access";
import { requireUser } from "@/lib/session";

export default async function StartPage() {
  const user = await requireUser();
  await requireEntitlement(user);
  return (
    <div className="mx-auto max-w-4xl space-y-7">
      <header><p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">Comienza aquí</p><h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Un camino pequeño, honesto y posible.</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted">Nexo 21 no es una prueba que debas aprobar. Es un espacio educativo para observar tus propios hábitos y practicar una forma más atenta de relacionarte.</p></header>
      <div className="grid gap-4 sm:grid-cols-3">
        {[{icon:Clock3,title:"15–25 minutos",text:"Lee, reflexiona y elige una acción breve."},{icon:Compass,title:"Un día a la vez",text:"No adelantes por ansiedad. Practica antes de acumular."},{icon:HeartHandshake,title:"Tu parte, no control",text:"Trabaja sobre lo que está bajo tu responsabilidad."}].map(({icon:Icon,title,text})=><div key={title} className="app-card p-5"><Icon className="text-[#B85C42]"/><h2 className="mt-4 font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>)}
      </div>
      <section className="surface p-6 sm:p-8"><div className="flex items-start gap-4"><ShieldCheck className="mt-1 shrink-0 text-[#547055]"/><div><h2 className="editorial-title text-3xl">Antes de comenzar</h2><div className="mt-4 space-y-3 leading-7 text-muted"><p>Este producto es educativo y espiritual. No ofrece diagnóstico, terapia, asesoría legal ni atención de emergencia.</p><p>Una relación sana requiere libertad, consentimiento, respeto y responsabilidad de ambas personas. Ninguna práctica garantiza un resultado ni obliga a tu pareja a cambiar.</p></div></div></div></section>
      <section className="rounded-2xl border border-[#d8b5a9] bg-[#fff8f4] p-6 sm:p-8"><div className="flex items-start gap-4"><CircleAlert className="mt-1 shrink-0 text-[#A53D3D]"/><div><h2 className="text-xl font-semibold">Tu seguridad está primero</h2><p className="mt-3 leading-7 text-[#6b4a43]">Si hay violencia, coerción, amenazas, abuso, control o riesgo físico, no uses estas herramientas para confrontar, mediar o esforzarte más para corregir a quien agrede. Busca ayuda local especializada, una persona de confianza o los servicios de emergencia de tu país cuando corresponda, desde un dispositivo seguro.</p></div></div></section>
      <div className="flex justify-end"><Link href="/app/jornada/1" className="primary-button w-fit">Empezar el día 1 <ArrowRight size={18}/></Link></div>
    </div>
  );
}
