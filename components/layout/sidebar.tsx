"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  LogOut,
  CheckSquare,
  FolderKanban,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/lib/action";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full border-r bg-slate-50 dark:bg-slate-900">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          <h2 className="text-lg font-semibold">Task Manager</h2>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <form action={logoutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
