"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Clock } from "lucide-react";

export function TodayActivitiesCard() {
  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Actividades de Hoy</CardTitle>
        <Clock className="w-5 h-5 text-primary-500" />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Sin actividades programadas para hoy</p>
      </CardContent>
    </Card>
  );
}
