"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { BookOpen } from "lucide-react";
import { useExams } from "@/hooks/useExams";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function NextExamCard() {
  const { exams, isLoading } = useExams();

  const todayStr = format(new Date(), "yyyy-MM-dd");
  const upcoming = exams
    .filter((e) => e.exam_date >= todayStr)
    .sort((a, b) => a.exam_date.localeCompare(b.exam_date));
  const nextExam = upcoming[0];

  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Próximo Parcial</CardTitle>
        <BookOpen className="w-5 h-5 text-primary-500" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : nextExam ? (
          <div className="space-y-1">
            <p className="font-medium text-foreground text-base">{nextExam.subject}</p>
            {nextExam.title && (
              <p className="text-sm text-muted-foreground">{nextExam.title}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {format(parseISO(nextExam.exam_date), "EEEE d 'de' MMMM", { locale: es })}
            </p>
            {nextExam.exam_time && (
              <p className="text-xs text-muted-foreground">{nextExam.exam_time} hs</p>
            )}
            <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 capitalize">
              {nextExam.exam_type}
            </span>
          </div>
        ) : (
          <p className="text-muted-foreground">No hay parciales próximos</p>
        )}
      </CardContent>
    </Card>
  );
}
