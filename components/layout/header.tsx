import { getSession } from "@/lib/action";
import LogoutButton from "./logout-button";

export async function Header() {
  const session = await getSession();

  return (
    <header className="border-b bg-white dark:bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Welcome back, {session && session?.userName}
        </h1>

        <LogoutButton />
      </div>
    </header>
  );
}
