"use client";

import { useTheme } from "@/hooks/useTheme";

const AVATAR_STYLES = ["cat", "robot", "anime", "pixel"] as const;

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground">
          Personaliza tu experiencia
        </p>
      </div>

      <section className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-semibold mb-4">Apariencia</h2>
        <div className="space-y-3">
          <label className="block">
            <span className="text-sm text-muted-foreground">Tema</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
              className="mt-1 block w-full rounded-lg border-border bg-surface dark:bg-surface-dark-alt px-3 py-2 text-sm"
            >
              <option value="light">Claro</option>
              <option value="dark">Oscuro</option>
              <option value="system">Sistema</option>
            </select>
          </label>
        </div>
      </section>

      <section className="bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border">
        <h2 className="text-lg font-semibold mb-4">Estilo del Avatar</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AVATAR_STYLES.map((style) => (
            <button
              key={style}
              className="p-4 rounded-lg border border-border hover:border-primary-500 transition-colors capitalize"
            >
              {style}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
