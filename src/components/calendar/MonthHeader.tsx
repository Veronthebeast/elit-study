"use client";

import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MonthHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" onClick={prevMonth}>
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <h2 className="text-lg font-semibold text-foreground capitalize">
        {format(currentDate, "MMMM yyyy", { locale: es })}
      </h2>

      <Button variant="ghost" onClick={nextMonth}>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
