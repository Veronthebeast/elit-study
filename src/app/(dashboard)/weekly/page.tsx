"use client";

import { WeekGrid } from "@/components/weekly/WeekGrid";

export default function WeeklyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cronograma Semanal</h1>
        <p className="text-muted-foreground">
          Planifica tu semana académica
        </p>
      </div>

      <WeekGrid />
    </div>
  );
}
