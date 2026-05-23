"use client";

import { memo } from "react";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = memo(function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="lg:ml-64 sticky top-0 z-30 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 lg:px-6 h-14">
        <div className="lg:hidden">
          <h1 className="text-lg font-bold text-primary-600 dark:text-primary-400">
            Elit Study
          </h1>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark-alt transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" />
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-surface-alt dark:hover:bg-surface-dark-alt transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
          </button>

          {user && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                {user.email?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
});
