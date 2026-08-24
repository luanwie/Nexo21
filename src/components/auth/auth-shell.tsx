import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#f5f1e8] px-4 py-10 text-[#26352f] sm:px-6">
      <div
        aria-hidden="true"
        className="absolute -left-28 top-[-5rem] h-72 w-72 rounded-full bg-[#dbe6d5]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#e8d9c8]/75 blur-3xl"
      />

      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full px-3 py-2 text-[#314b3f] outline-none transition hover:bg-white/50 focus-visible:ring-2 focus-visible:ring-[#51705f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f1e8]"
          aria-label="Nexo 21, ir al inicio"
        >
          <span className="grid size-9 place-items-center rounded-full bg-[#314b3f] font-serif text-sm font-semibold text-[#fffdf8] shadow-sm">
            21
          </span>
          <span className="font-serif text-2xl font-semibold tracking-[-0.03em]">Nexo 21</span>
        </Link>

        <section className="rounded-[1.75rem] border border-[#314b3f]/10 bg-[#fffdf8]/95 p-6 shadow-[0_24px_70px_-34px_rgba(42,61,52,0.5)] backdrop-blur sm:p-8">
          <header className="mb-7 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#9a674e]">{eyebrow}</p>
            <h1 className="font-serif text-3xl font-semibold tracking-[-0.035em] text-[#24372e] sm:text-[2rem]">
              {title}
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#647169]">{description}</p>
          </header>

          {children}
        </section>

        <p className="mx-auto mt-6 max-w-sm text-center text-xs leading-5 text-[#6f7772]">
          Nexo 21 ofrece contenido educativo y no sustituye acompañamiento profesional.
        </p>
      </div>
    </main>
  );
}
