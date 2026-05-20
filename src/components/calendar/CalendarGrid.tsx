"use client";

import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isToday,
  format,
} from "date-fns";
import { es } from "date-fns/locale";
import { DayCell } from "./DayCell";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate?: Date;
}

export function CalendarGrid({ currentDate = new Date() }: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const emptyCells = Array.from({ length: startDay === 0 ? 6 : startDay - 1 });

  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="grid grid-cols-7 border-b border-border">
        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(
          (day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium text-muted-foreground border-r border-border last:border-r-0"
            >
              {day}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-7">
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[100px] border-r border-b border-border" />
        ))}

        {days.map((day, i) => {
          const dayOfWeek = (startDay + i) % 7;
          const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

          return (
            <DayCell
              key={day.toISOString()}
              day={day}
              isWeekend={isWeekend}
            />
          );
        })}
      </div>
    </div>
  );
}
