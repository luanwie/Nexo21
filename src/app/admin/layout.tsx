import { AppSidebar } from "@/components/app-sidebar";
import { requireAdmin } from "@/lib/session";

export default async function AdminLayout({children}:{children:React.ReactNode}){const user=await requireAdmin();return <div className="app-shell"><AppSidebar name={user.name} role={user.role}/><main className="min-h-screen px-4 pb-16 pt-20 md:ml-[274px] md:px-8 md:pt-8 lg:px-12"><div className="mx-auto max-w-[1280px]">{children}</div></main></div>}
