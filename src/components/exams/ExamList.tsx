"use client";

import { useState } from "react";
import { ExamCard } from "./ExamCard";
import { ExamModal } from "./ExamModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export function ExamList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Parcial
        </Button>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center py-8">
          No hay parciales registrados. ¡Agrega tu primer parcial!
        </p>
      </div>

      <ExamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
