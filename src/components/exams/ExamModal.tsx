"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { useExams } from "@/hooks/useExams";
import type { Exam } from "@/types/exam";

interface ExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam?: Exam | null;
}

const examTypes = [
  { value: "parcial", label: "Parcial" },
  { value: "final", label: "Final" },
  { value: "recuperatorio", label: "Recuperatorio" },
  { value: "otros", label: "Otros" },
];

export function ExamModal({ isOpen, onClose, exam }: ExamModalProps) {
  const { createExam, updateExam } = useExams();
  const [subject, setSubject] = useState(exam?.subject || "");
  const [examDate, setExamDate] = useState(exam?.exam_date?.split("T")[0] || "");
  const [examType, setExamType] = useState(exam?.exam_type || "parcial");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !examDate) return;
    setIsSubmitting(true);
    setError(null);

    let result;
    if (exam) {
      result = await updateExam(exam.id, {
        subject: subject.trim(),
        exam_date: examDate,
        exam_type: examType as Exam["exam_type"],
      });
    } else {
      result = await createExam({
        subject: subject.trim(),
        exam_date: examDate,
        exam_type: examType as Exam["exam_type"],
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
    <Modal isOpen={isOpen} onClose={onClose} title={exam ? "Editar Parcial" : "Nuevo Parcial"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

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
          onChange={(e) => setExamType(e.target.value as Exam["exam_type"])}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : exam ? "Guardar Cambios" : "Crear Parcial"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
