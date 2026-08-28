"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookHeart, BookOpen, CircleUserRound, Heart, Home, Library, ListChecks,
  MessageCircleHeart, NotebookPen, PanelLeftClose, PanelLeftOpen, Settings,
  ShoppingBag, Sparkles, Store, UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { BrandLogo } from "@/components/brand-logo";

type NavLink = { href: string; label: string; icon: typeof Home };
type Section = { title: string; links: NavLink[] };

const sections: Section[] = [
  {
    title: "Mi recorrido",
    links: [
      { href: "/app", label: "Hoy", icon: Home },
      { href: "/app/comenzar", label: "Comienza aquí", icon: Sparkles },
      { href: "/app/jornada", label: "Mi jornada", icon: ListChecks },
    ],
  },
  {
    title: "Mi espacio",
    links: [
      { href: "/app/diario", label: "Mi diario", icon: NotebookPen },
      { href: "/app/conversaciones", label: "Conversaciones", icon: MessageCircleHeart },
      { href: "/app/mensajes", label: "Mensajes", icon: BookHeart },
      { href: "/app/acciones", label: "Pequeñas acciones", icon: Heart },
    ],
  },
  {
    title: "Fe y vida",
    links: [
      { href: "/app/devocionales", label: "Devocionales", icon: BookOpen },
      { href: "/app/oraciones", label: "Oraciones", icon: Library },
    ],
  },
  {
    title: "Mi biblioteca",
    links: [
      { href: "/app/biblioteca", label: "Mis ebooks", icon: Library },
      { href: "/app/favoritos", label: "Favoritos", icon: Store },
    ],
  },
  {
    title: "Explorar",
    links: [
      { href: "/app/tienda", label: "Tienda", icon: ShoppingBag },
    ],
  },
];

function SidebarNavigation({
  pathname,
  role,
  name,
  onNavigate,
  onLogout,
}: {
  pathname: string;
  role: "MEMBER" | "ADMIN";
  name: string;
  onNavigate?: () => void;
  onLogout: () => void;
}) {
  return <>
    <div className="px-2 pb-6"><BrandLogo inverted /></div>
    <nav className="flex-1 space-y-1 overflow-y-auto" aria-label="Navegación principal">
      {sections.map((section) => (
        <div key={section.title}>
          <p className="px-3 pt-5 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{section.title}</p>
          {section.links.map(({ href, label, icon: Icon }) => {
            const active = href === "/app" ? pathname === href : pathname.startsWith(href);
            return <Link key={href} href={href} className="app-nav-link" data-active={active} aria-current={active ? "page" : undefined} onClick={onNavigate}><Icon size={18} aria-hidden /> <span>{label}</span></Link>;
          })}
        </div>
      ))}
      {role === "ADMIN" ? <Link href="/admin" className="app-nav-link" data-active={pathname.startsWith("/admin")} aria-current={pathname.startsWith("/admin") ? "page" : undefined} onClick={onNavigate}><UsersRound size={18} aria-hidden /> Administración</Link> : null}
    </nav>
    <div className="mt-4 border-t border-white/10 pt-4">
      <Link href="/app/cuenta" className="app-nav-link" data-active={pathname.startsWith("/app/cuenta")} aria-current={pathname.startsWith("/app/cuenta") ? "page" : undefined} onClick={onNavigate}><CircleUserRound size={18} aria-hidden /><span className="min-w-0 flex-1 truncate">{name}</span><Settings size={15} aria-hidden /></Link>
      <button type="button" onClick={onLogout} className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-white/55 hover:bg-white/8 hover:text-white">Cerrar sesión</button>
    </div>
  </>;
}

export function AppSidebar({ name, role }: { name: string; role: "MEMBER" | "ADMIN" }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function logout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return <>
    <button ref={triggerRef} type="button" className="no-print fixed left-3 top-3 z-50 grid size-11 place-items-center rounded-xl border border-[#ddd3c6] bg-[#fffdf8] text-[#25231f] shadow md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="mobile-app-navigation">
      {open ? <PanelLeftClose size={20} aria-hidden /> : <PanelLeftOpen size={20} aria-hidden />}
    </button>

    <aside className="app-sidebar no-print fixed inset-y-0 left-0 z-40 hidden w-[274px] flex-col px-4 py-5 md:flex">
      <SidebarNavigation pathname={pathname} role={role} name={name} onLogout={logout} />
    </aside>

    {open ? <>
      <button type="button" className="fixed inset-0 z-30 bg-black/35 md:hidden" onClick={() => setOpen(false)} aria-label="Cerrar menú" />
      <aside id="mobile-app-navigation" ref={menuRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Menú de la aplicación" className="app-sidebar no-print fixed inset-y-0 left-0 z-40 flex w-[274px] flex-col px-4 py-5 outline-none md:hidden">
        <SidebarNavigation pathname={pathname} role={role} name={name} onNavigate={() => setOpen(false)} onLogout={logout} />
      </aside>
    </> : null}
  </>;
}
