"use client";

import { useState } from "react";
import { DayColumn } from "./DayColumn";
import { AddActivityModal } from "./AddActivityModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { addDays, startOfWeek, format } from "date-fns";
import { es } from "date-fns/locale";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function WeekGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

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
            <DayColumn dayOfWeek={i} />
          </div>
        ))}
      </div>

      <AddActivityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
