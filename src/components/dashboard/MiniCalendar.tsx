"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Calendar } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export function MiniCalendar() {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const emptyCells = Array.from({ length: startDay === 0 ? 6 : startDay - 1 });

  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{format(today, "MMMM yyyy", { locale: es })}</CardTitle>
        <Calendar className="w-5 h-5 text-primary-500" />
      </CardHeader>
      <div className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
            <span key={d} className="text-xs text-muted-foreground font-medium">
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {emptyCells.map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map((day) => (
            <span
              key={day.toISOString()}
              className={cn(
                "text-xs p-1 rounded-full",
                isToday(day)
                  ? "bg-primary-500 text-white font-bold"
                  : "text-foreground hover:bg-surface-alt"
              )}
            >
              {format(day, "d")}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
