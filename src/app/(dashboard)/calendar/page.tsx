"use client";

import { MonthHeader } from "@/components/calendar/MonthHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendario</h1>
        <p className="text-muted-foreground">
          Visualiza tus eventos y fechas importantes
        </p>
      </div>

      <MonthHeader />
      <CalendarGrid />
    </div>
  );
}
