"use client";

import { Search } from "lucide-react";

export function TaskFilters() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar tareas..."
          className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-white dark:bg-surface-dark text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <select className="px-3 py-2 rounded-lg border border-border bg-white dark:bg-surface-dark text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500">
        <option value="">Todas las materias</option>
      </select>
      <select className="px-3 py-2 rounded-lg border border-border bg-white dark:bg-surface-dark text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500">
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en_progreso">En progreso</option>
        <option value="finalizada">Finalizada</option>
      </select>
    </div>
  );
}
