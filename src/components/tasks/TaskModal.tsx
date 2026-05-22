"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/task";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

const priorities = [
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
];

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const { createTask, updateTask } = useTasks();
  const [title, setTitle] = useState(task?.title || "");
  const [subject, setSubject] = useState(task?.subject || "");
  const [dueDate, setDueDate] = useState(task?.due_date?.split("T")[0] || "");
  const [priority, setPriority] = useState(task?.priority || "media");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    setError(null);

    let result;
    if (task) {
      result = await updateTask(task.id, {
        title: title.trim(),
        subject: subject.trim() || undefined,
        due_date: dueDate || undefined,
        priority: priority as Task["priority"],
      });
    } else {
      result = await createTask({
        title: title.trim(),
        subject: subject.trim() || undefined,
        due_date: dueDate || undefined,
        priority: priority as Task["priority"],
      });
    }

    if (result?.error) {
      setError(result.error.message);
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? "Editar Tarea" : "Nueva Tarea"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <Input
          id="title"
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Resolver ejercicios de cálculo"
          required
        />

        <Input
          id="subject"
          label="Materia"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ej: Cálculo II"
        />

        <Input
          id="due_date"
          label="Fecha de Entrega"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <Select
          id="priority"
          label="Prioridad"
          options={priorities}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : task ? "Guardar Cambios" : "Crear Tarea"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
