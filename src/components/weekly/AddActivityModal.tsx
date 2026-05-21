"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useWeeklySchedule } from "@/hooks/useWeeklySchedule";

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const days = [
  { value: "1", label: "Lunes" },
  { value: "2", label: "Martes" },
  { value: "3", label: "Miércoles" },
  { value: "4", label: "Jueves" },
  { value: "5", label: "Viernes" },
  { value: "6", label: "Sábado" },
  { value: "0", label: "Domingo" },
];

export function AddActivityModal({ isOpen, onClose }: AddActivityModalProps) {
  const { createActivity } = useWeeklySchedule();
  const [title, setTitle] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("1");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);

    await createActivity({
      title: title.trim(),
      day_of_week: parseInt(dayOfWeek),
      start_time: startTime || undefined,
      end_time: endTime || undefined,
    });

    setIsSubmitting(false);
    setTitle("");
    setDayOfWeek("1");
    setStartTime("");
    setEndTime("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nueva Actividad">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="activity_title"
          label="Actividad"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Clase de Álgebra"
          required
        />

        <Select
          id="day"
          label="Día"
          options={days}
          value={dayOfWeek}
          onChange={(e) => setDayOfWeek(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            id="start_time"
            label="Hora inicio"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <Input
            id="end_time"
            label="Hora fin"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Agregar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
