"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";

export function DayHeader() {
  const today = new Date();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground capitalize">
        {format(today, "EEEE, d 'de' MMMM", { locale: es })}
      </h1>
      <p className="text-muted-foreground">
        Tu resumen del día
      </p>
    </div>
  );
}
