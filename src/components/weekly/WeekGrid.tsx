"use client";

import { useState, useMemo } from "react";
import { DayColumn } from "./DayColumn";
import { AddActivityModal } from "./AddActivityModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { addDays, startOfWeek, format } from "date-fns";
import { es } from "date-fns/locale";
import { useWeeklySchedule } from "@/hooks/useWeeklySchedule";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function WeekGrid() {
  const { activities, isLoading } = useWeeklySchedule();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const activitiesByDay = useMemo(() => {
    const map: Record<number, typeof activities> = {};
    for (let i = 0; i < 7; i++) map[i] = [];
    for (const act of activities) {
      if (map[act.day_of_week]) {
        map[act.day_of_week].push(act);
      }
    }
    return map;
  }, [activities]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">
          Semana del {format(weekStart, "d 'de' MMMM", { locale: es })}
        </h2>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Actividad
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((day, i) => (
          <div key={day}>
            <div className="text-center mb-2">
              <p className="text-xs font-medium text-muted-foreground">{day}</p>
              <p className="text-lg font-bold text-foreground">
                {format(addDays(weekStart, i), "d")}
              </p>
            </div>
            <DayColumn
              dayOfWeek={i}
              activities={activitiesByDay[i] || []}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>

      <AddActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
