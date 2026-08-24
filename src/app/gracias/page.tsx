import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Clock3,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = {
  title: "Activa tu acceso",
  description: "Pasos para crear y activar tu acceso a Nexo 21 si completaste tu compra en Hotmart.",
};

const accessSteps = [
  {
    icon: MailCheck,
    title: "Usa el correo de tu compra",
    description:
      "Crea tu cuenta con el mismo correo que usaste en la compra. Así podremos vincular tu acceso sin pedir datos personales en esta página.",
  },
  {
    icon: CheckCircle2,
    title: "Confirma tu correo",
    description:
      "Después del registro, abre el mensaje de Nexo 21 y confirma que ese correo te pertenece. Revisa también spam o promociones.",
  },
  {
    icon: Clock3,
    title: "Espera unos minutos",
    description:
      "Si el pago fue aprobado, Hotmart envía la confirmación mediante un webhook. Tu acceso se habilita cuando recibimos y procesamos esa confirmación.",
  },
];

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  if (Object.keys(query).length > 0) redirect("/gracias");

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#f5f1e8] px-4 py-6 text-[#26352f] sm:px-6 sm:py-10">
      <div
        aria-hidden="true"
        className="absolute -left-28 top-[-5rem] h-72 w-72 rounded-full bg-[#dbe6d5]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#e8d9c8]/75 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-4xl">
        <header className="mb-8 flex items-center justify-between gap-4">
          <BrandLogo />
          <span className="hidden rounded-full border border-[#314b3f]/10 bg-[#fffdf8]/75 px-3 py-1.5 text-xs font-bold text-[#426451] sm:inline-flex">
            Próximo paso: activar tu acceso
          </span>
        </header>

        <section className="rounded-[1.75rem] border border-[#314b3f]/10 bg-[#fffdf8]/95 p-5 shadow-[0_24px_70px_-34px_rgba(42,61,52,0.5)] backdrop-blur sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#9a674e]">
              Si completaste tu compra
            </p>
            <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] text-[#24372e] sm:text-5xl">
              Activa tu acceso a Nexo 21
            </h1>
            <p className="mt-4 text-base leading-7 text-[#647169] sm:text-lg">
              Si Hotmart confirmó tu pago, sigue estos pasos para que Nexo 21 reconozca tu cuenta y habilite tu jornada.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {accessSteps.map(({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                className="rounded-2xl border border-[#314b3f]/10 bg-white/65 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e7eee3] text-[#426451]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9a674e]">
                    Paso {index + 1}
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-xl font-semibold text-[#24372e]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#647169]">{description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-7 rounded-2xl bg-[#314b3f] p-5 text-[#fffdf8] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <div>
              <p className="font-serif text-xl font-semibold">¿Lista para crear tu acceso?</p>
              <p className="mt-1 text-sm leading-6 text-white/70">
                Recuerda usar exactamente el correo de la compra.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:mt-0 sm:min-w-56">
              <Link
                href="/registro"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#314b3f] outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#314b3f]"
              >
                Crear mi acceso
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-white/25 px-5 py-2.5 text-sm font-bold text-white outline-none transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#314b3f]"
              >
                Ya tengo una cuenta
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-[#314b3f]/10 bg-[#fffdf8]/80 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <CircleHelp className="text-[#9a674e]" size={22} aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-[#24372e]">
                ¿Problemas con el acceso?
              </h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#647169]">
              <li>• Verifica que registro y compra usen el mismo correo.</li>
              <li>• Confirma tu correo y vuelve a ingresar después de unos minutos.</li>
              <li>• Revisa spam o promociones si no encuentras el mensaje.</li>
            </ul>
            <Link
              href="/soporte"
              className="mt-5 inline-flex items-center gap-2 rounded-lg font-bold text-[#426451] underline decoration-[#426451]/30 underline-offset-4 outline-none hover:text-[#263d32] focus-visible:ring-2 focus-visible:ring-[#51705f]"
            >
              Ir a soporte
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>

          <section className="rounded-2xl border border-[#314b3f]/10 bg-[#e7eee3]/75 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#426451]" size={22} aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-[#24372e]">
                Tu seguridad importa
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-[#56645c]">
              Esta página no necesita ni muestra tu correo, nombre o datos de pago en la URL. No compartas tu contraseña, recibo completo ni información de la tarjeta.
            </p>
            <p className="mt-3 flex gap-2 text-xs leading-5 text-[#647169]">
              <LockKeyhole className="mt-0.5 shrink-0" size={15} aria-hidden="true" />
              La vinculación ocurre de forma segura cuando Hotmart confirma la compra y tú verificas tu correo.
            </p>
          </section>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-5 text-[#6f7772]">
          Nexo 21 ofrece contenido educativo y no sustituye acompañamiento profesional.
        </p>
      </div>
    </main>
  );
}
