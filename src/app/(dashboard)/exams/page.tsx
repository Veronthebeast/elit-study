"use client";

import { ExamList } from "@/components/exams/ExamList";

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Parciales</h1>
          <p className="text-muted-foreground">
            Gestiona tus exámenes y parciales
          </p>
        </div>
      </div>

      <ExamList />
    </div>
  );
}
