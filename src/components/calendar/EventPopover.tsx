"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EventPopoverProps {
  date: Date;
  events: { title: string; time?: string; type?: string }[];
  onClose: () => void;
}

export function EventPopover({ date, events, onClose }: EventPopoverProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute z-10 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-border p-4 w-64"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground">
          {format(date, "d 'de' MMMM", { locale: es })}
        </h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-surface-alt">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-2">
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin eventos</p>
        ) : (
          events.map((event, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-surface-alt dark:bg-surface-dark-alt">
              {event.time && (
                <span className="text-xs text-muted-foreground">{event.time}</span>
              )}
              <span className="text-sm text-foreground">{event.title}</span>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
