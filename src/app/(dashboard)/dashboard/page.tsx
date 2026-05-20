"use client";

import { NextExamCard } from "@/components/dashboard/NextExamCard";
import { PendingTasksCard } from "@/components/dashboard/PendingTasksCard";
import { MiniCalendar } from "@/components/dashboard/MiniCalendar";
import { TodayActivitiesCard } from "@/components/dashboard/TodayActivitiesCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen de tu vida universitaria
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NextExamCard />
        <PendingTasksCard />
        <MiniCalendar />
      </div>

      <TodayActivitiesCard />
    </div>
  );
}
