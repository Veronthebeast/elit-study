"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { BookOpen } from "lucide-react";

export function NextExamCard() {
  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Próximo Parcial</CardTitle>
        <BookOpen className="w-5 h-5 text-primary-500" />
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">No hay parciales próximos</p>
      </CardContent>
    </Card>
  );
}
