"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: any;
}

const priorities = [
  { value: "baja", label: "Baja" },
  { value: "media", label: "Media" },
  { value: "alta", label: "Alta" },
];

export function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [subject, setSubject] = useState(task?.subject || "");
  const [dueDate, setDueDate] = useState(task?.due_date || "");
  const [priority, setPriority] = useState(task?.priority || "media");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement task CRUD
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? "Editar Tarea" : "Nueva Tarea"}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          onChange={(e) => setPriority(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {task ? "Guardar Cambios" : "Crear Tarea"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
