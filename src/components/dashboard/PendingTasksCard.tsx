"use client";

import { memo, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CheckSquare } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const priorityColors: Record<string, string> = {
  alta: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
  media: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20",
  baja: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
};

export const PendingTasksCard = memo(function PendingTasksCard() {
  const { tasks, isLoading } = useTasks();

  const pending = useMemo(
    () => tasks.filter((t) => t.status !== "finalizada"),
    [tasks]
  );

  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tareas Pendientes</CardTitle>
        <CheckSquare className="w-5 h-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : pending.length > 0 ? (
          <ul className="space-y-2">
            {pending.slice(0, 5).map((task) => (
              <li key={task.id} className="border-b border-border last:border-b-0 pb-2 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground text-sm truncate">{task.title}</p>
                    {task.subject && (
                      <p className="text-xs text-muted-foreground">{task.subject}</p>
                    )}
                    {task.due_date && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(parseISO(task.due_date), "d MMM", { locale: es })}
                      </p>
                    )}
                  </div>
                  <span
                    className={cn(
                      "shrink-0 text-[10px] px-1.5 py-0.5 rounded font-medium",
                      priorityColors[task.priority] || ""
                    )}
                  >
                    {task.priority}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No hay tareas pendientes</p>
        )}
      </CardContent>
    </Card>
  );
});
