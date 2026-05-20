"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

interface ActivityRowProps {
  title: string;
  time?: string;
  color?: string;
  completed?: boolean;
  onToggle?: () => void;
}

export function ActivityRow({ title, time, color, completed, onToggle }: ActivityRowProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-lg transition-colors",
      completed ? "opacity-50" : "hover:bg-surface-alt dark:hover:bg-surface-dark-alt"
    )}>
      <Checkbox checked={completed} onChange={onToggle} />
      <div className="flex items-center gap-2 flex-1">
        {color && (
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        )}
        <span className={cn("text-sm text-foreground", completed && "line-through")}>
          {title}
        </span>
      </div>
      {time && <span className="text-xs text-muted-foreground">{time}</span>}
    </div>
  );
}
