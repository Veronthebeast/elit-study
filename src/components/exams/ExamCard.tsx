"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock } from "lucide-react";
import type { Exam } from "@/types/exam";

interface ExamCardProps {
  exam: Exam;
  onClick?: () => void;
}

const statusVariant = {
  pendiente: "warning" as const,
  en_preparacion: "info" as const,
  completado: "success" as const,
};

export function ExamCard({ exam, onClick }: ExamCardProps) {
  return (
    <Card hoverable className="cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground">{exam.subject}</h3>
          {exam.title && (
            <p className="text-sm text-muted-foreground">{exam.title}</p>
          )}
        </div>
        <Badge variant={statusVariant[exam.status as keyof typeof statusVariant] || "default"}>
          {exam.status === "pendiente" ? "Pendiente" :
           exam.status === "en_preparacion" ? "En preparación" : "Completado"}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {format(parse(exam.exam_date, "yyyy-MM-dd", new Date()), "d 'de' MMMM", { locale: es })}
        </span>
        {exam.exam_time && (
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {exam.exam_time}
          </span>
        )}
      </div>
    </Card>
  );
}
