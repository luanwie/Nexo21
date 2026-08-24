import { AppSidebar } from "@/components/app-sidebar";
import { requireUser } from "@/lib/session";

export default async function ProductLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="app-shell">
      <AppSidebar name={user.name} role={user.role} />
      <main className="min-h-screen px-4 pb-16 pt-20 md:ml-[274px] md:px-8 md:pt-8 lg:px-12">
        <div className="mx-auto max-w-[1180px]">{children}</div>
      </main>
    </div>
  );
}
