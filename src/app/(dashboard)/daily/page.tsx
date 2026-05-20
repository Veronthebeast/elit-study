"use client";

import { DayHeader } from "@/components/daily/DayHeader";
import { TaskTimeline } from "@/components/daily/TaskTimeline";
import { ExamAlerts } from "@/components/daily/ExamAlerts";

export default function DailyPage() {
  return (
    <div className="space-y-6">
      <DayHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TaskTimeline />
        </div>
        <div>
          <ExamAlerts />
        </div>
      </div>
    </div>
  );
}
