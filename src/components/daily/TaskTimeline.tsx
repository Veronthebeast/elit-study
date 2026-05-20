"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Clock } from "lucide-react";

export function TaskTimeline() {
  const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 - 20:00

  return (
    <Card>
      <CardHeader>
        <CardTitle>Línea de Tiempo</CardTitle>
      </CardHeader>
      <div className="px-4 pb-4 space-y-0">
        {hours.map((hour) => (
          <div key={hour} className="flex items-start gap-3 group">
            <div className="flex items-center gap-1 pt-1 w-14">
              <Clock className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {hour.toString().padStart(2, "0")}:00
              </span>
            </div>
            <div className="flex-1 border-t border-border/50 min-h-[3rem] relative group-hover:border-border transition-colors">
              {/* Event placeholder */}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
