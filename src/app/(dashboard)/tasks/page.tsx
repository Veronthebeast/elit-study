"use client";

import { TaskFilters } from "@/components/tasks/TaskFilters";
import { TaskList } from "@/components/tasks/TaskList";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tareas</h1>
        <p className="text-muted-foreground">
          Organiza tus trabajos y actividades
        </p>
      </div>

      <TaskFilters />
      <TaskList />
    </div>
  );
}
