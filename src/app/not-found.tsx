import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

export default function NotFound(){return <main className="grid min-h-screen place-items-center bg-[#F5F1E8] px-4"><section className="surface max-w-xl p-8 text-center sm:p-12"><div className="flex justify-center"><BrandLogo/></div><p className="mt-8 text-sm font-semibold uppercase tracking-[.18em] text-[#B85C42]">Página no encontrada</p><h1 className="editorial-title mt-3 text-5xl">Este camino no existe.</h1><p className="mt-4 leading-7 text-muted">Vuelve al inicio o entra a tu jornada para continuar desde el último paso.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/" className="secondary-button"><ArrowLeft size={16}/> Ir al inicio</Link><Link href="/app" className="primary-button w-fit">Continuar mi recorrido</Link></div></section></main>}
