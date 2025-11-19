import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { getSession } from "@/lib/action";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 shrink-0">
        <Sidebar />
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto p-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
