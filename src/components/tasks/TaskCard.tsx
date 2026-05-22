"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const priorityColor = {
  alta: "text-red-500",
  media: "text-amber-500",
  baja: "text-green-500",
};

const statusVariant = {
  pendiente: "warning" as const,
  en_progreso: "info" as const,
  finalizada: "success" as const,
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <Card hoverable className={cn("cursor-pointer", task.status === "finalizada" && "opacity-60")} onClick={onClick}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.status === "finalizada"}
          className="mt-1"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={cn(
                "font-medium text-foreground",
                task.status === "finalizada" && "line-through"
              )}>
                {task.title}
              </h3>
              {task.subject && (
                <p className="text-sm text-muted-foreground">{task.subject}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Flag className={cn("w-4 h-4", priorityColor[task.priority as keyof typeof priorityColor])} />
              <Badge variant={statusVariant[task.status as keyof typeof statusVariant] || "default"}>
                {task.status === "pendiente" ? "Pendiente" :
                 task.status === "en_progreso" ? "En progreso" : "Finalizada"}
              </Badge>
            </div>
          </div>
          {task.due_date && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              {format(parse(task.due_date, "yyyy-MM-dd", new Date()), "d 'de' MMMM", { locale: es })}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
