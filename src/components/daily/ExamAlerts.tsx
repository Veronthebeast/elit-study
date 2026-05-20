"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Bell } from "lucide-react";

export function ExamAlerts() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Alertas de Exámenes</CardTitle>
        <Bell className="w-5 h-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center py-4">
          No hay alertas de exámenes próximos
        </p>
      </CardContent>
    </Card>
  );
}
