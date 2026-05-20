"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CheckSquare } from "lucide-react";

export function PendingTasksCard() {
  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Tareas Pendientes</CardTitle>
        <CheckSquare className="w-5 h-5 text-amber-500" />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No hay tareas pendientes</p>
      </CardContent>
    </Card>
  );
}
