"use client";

import { memo, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Clock } from "lucide-react";
import { useWeeklySchedule } from "@/hooks/useWeeklySchedule";
import { cn } from "@/lib/utils";

export const TodayActivitiesCard = memo(function TodayActivitiesCard() {
  const { activities, isLoading } = useWeeklySchedule();
  const todayIndex = useMemo(() => new Date().getDay(), []);
  const todayActivities = useMemo(
    () => activities.filter((a) => a.day_of_week === todayIndex),
    [activities, todayIndex]
  );

  return (
    <Card hoverable>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Actividades de Hoy</CardTitle>
        <Clock className="w-5 h-5 text-primary-500" />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Cargando...</p>
        ) : todayActivities.length > 0 ? (
          <ul className="space-y-2">
            {todayActivities.map((act) => (
              <li
                key={act.id}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-lg border border-border",
                  act.completed && "opacity-50"
                )}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: act.color || "#6b7280" }}
                />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium text-foreground", act.completed && "line-through")}>
                    {act.title}
                  </p>
                  {(act.start_time || act.end_time) && (
                    <p className="text-xs text-muted-foreground">
                      {act.start_time && act.start_time.slice(0, 5)}
                      {act.start_time && act.end_time && " — "}
                      {act.end_time && act.end_time.slice(0, 5)}
                    </p>
                  )}
                </div>
                {act.description && (
                  <span className="text-xs text-muted-foreground truncate max-w-[120px] hidden sm:block">
                    {act.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">Sin actividades programadas para hoy</p>
        )}
      </CardContent>
    </Card>
  );
});
