"use client";

interface DayColumnProps {
  dayOfWeek: number;
  activities?: { id: string; title: string; time?: string; color?: string; completed?: boolean }[];
}

export function DayColumn({ dayOfWeek, activities = [] }: DayColumnProps) {
  return (
    <div className="space-y-1 min-h-[200px]">
      {activities.length === 0 ? (
        <div className="h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Sin actividades</span>
        </div>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="p-2 rounded-lg text-xs text-white truncate cursor-pointer hover:opacity-80 transition-opacity"
            style={{ backgroundColor: activity.color || "#6366f1" }}
          >
            {activity.time && <span className="font-medium">{activity.time} </span>}
            {activity.title}
          </div>
        ))
      )}
    </div>
  );
}
