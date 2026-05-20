"use client";

import { format, isToday } from "date-fns";
import { cn } from "@/lib/utils";

interface DayCellProps {
  day: Date;
  isWeekend: boolean;
  events?: { title: string; color?: string }[];
}

export function DayCell({ day, isWeekend, events = [] }: DayCellProps) {
  return (
    <div
      className={cn(
        "min-h-[100px] p-2 border-r border-b border-border last:border-r-0",
        isWeekend && "bg-surface-alt/50 dark:bg-surface-dark-alt/30"
      )}
    >
      <span
        className={cn(
          "inline-flex items-center justify-center w-7 h-7 text-sm rounded-full",
          isToday(day) && "bg-primary-500 text-white font-bold"
        )}
      >
        {format(day, "d")}
      </span>

      <div className="mt-1 space-y-1">
        {events.map((event, i) => (
          <div
            key={i}
            className="text-xs px-1.5 py-0.5 rounded truncate"
            style={{ backgroundColor: event.color || "#6366f1", color: "white" }}
          >
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
