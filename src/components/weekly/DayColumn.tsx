"use client";

import { useState } from "react";
import { useWeeklySchedule } from "@/hooks/useWeeklySchedule";
import type { WeeklyActivity } from "@/types/weekly";

interface DayColumnProps {
  dayOfWeek: number;
  activities: WeeklyActivity[];
  isLoading?: boolean;
}

export function DayColumn({ dayOfWeek, activities, isLoading }: DayColumnProps) {
  const { toggleActivityCompletion, deleteActivity } = useWeeklySchedule();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const formatTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
  };

  const handleToggle = async (id: string) => {
    await toggleActivityCompletion(id);
  };

  const handleDelete = async (id: string) => {
    await deleteActivity(id);
    setConfirmDelete(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-1 min-h-[200px]">
        <div className="h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 min-h-[200px]">
      {activities.length === 0 ? (
        <div className="h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Sin actividades</span>
        </div>
      ) : (
        activities.map((activity) => (
          <div key={activity.id} className="group relative">
            {confirmDelete === activity.id ? (
              <div className="p-2 rounded-lg text-xs bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700">
                <p className="text-red-600 dark:text-red-400 mb-1">¿Eliminar?</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 dark:text-red-400 font-medium hover:underline"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="text-muted-foreground hover:underline"
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`p-2 rounded-lg text-xs text-white truncate cursor-pointer transition-all ${
                  activity.completed ? "opacity-50" : "hover:opacity-80"
                }`}
                style={{ backgroundColor: activity.color || "#6366f1" }}
                onClick={() => handleToggle(activity.id)}
              >
                {activity.start_time && (
                  <span className="font-medium">{formatTime(activity.start_time)} </span>
                )}
                <span className={activity.completed ? "line-through" : ""}>
                  {activity.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmDelete(activity.id);
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Eliminar"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
