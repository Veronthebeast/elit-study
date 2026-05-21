"use client";

import { useState } from "react";
import { ExamCard } from "./ExamCard";
import { ExamModal } from "./ExamModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useExams } from "@/hooks/useExams";
import type { Exam } from "@/types/exam";

export function ExamList() {
  const { exams, isLoading, deleteExam, refetch } = useExams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingExam(null);
    refetch();
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Eliminar este parcial?")) {
      await deleteExam(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar Parcial
        </Button>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Cargando...</p>
        ) : exams.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay parciales registrados. ¡Agrega tu primer parcial!
          </p>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="relative group" onClick={() => handleEdit(exam)}>
              <ExamCard exam={exam} />
              <button
                onClick={(e) => handleDelete(exam.id, e)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity text-xs px-2 py-1 rounded bg-surface-alt dark:bg-surface-dark-alt"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      <ExamModal isOpen={isModalOpen} onClose={handleClose} exam={editingExam} />
    </div>
  );
}
