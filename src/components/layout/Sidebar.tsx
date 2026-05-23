"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Calendar,
  CalendarRange,
  Clock,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/exams", icon: BookOpen, label: "Parciales" },
  { href: "/tasks", icon: CheckSquare, label: "Tareas" },
  { href: "/calendar", icon: Calendar, label: "Calendario" },
  { href: "/weekly", icon: CalendarRange, label: "Semanal" },
  { href: "/daily", icon: Clock, label: "Hoy" },
  { href: "/settings", icon: Settings, label: "Ajustes" },
];

export const Sidebar = memo(function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 flex-col bg-white dark:bg-surface-dark border-r border-border z-40">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
          Elit Study
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Hub Universitario
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Elit Study v0.1.0
        </p>
      </div>
    </aside>
  );
});
