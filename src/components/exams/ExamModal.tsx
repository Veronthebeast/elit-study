"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam?: any;
}

const examTypes = [
  { value: "parcial", label: "Parcial" },
  { value: "final", label: "Final" },
  { value: "recuperatorio", label: "Recuperatorio" },
  { value: "otros", label: "Otros" },
];

export function ExamModal({ isOpen, onClose, exam }: ExamModalProps) {
  const [subject, setSubject] = useState(exam?.subject || "");
  const [examDate, setExamDate] = useState(exam?.exam_date || "");
  const [examType, setExamType] = useState(exam?.exam_type || "parcial");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement exam CRUD
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={exam ? "Editar Parcial" : "Nuevo Parcial"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="subject"
          label="Materia"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ej: Álgebra Lineal"
          required
        />

        <Input
          id="exam_date"
          label="Fecha del Examen"
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />

        <Select
          id="exam_type"
          label="Tipo"
          options={examTypes}
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {exam ? "Guardar Cambios" : "Crear Parcial"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
