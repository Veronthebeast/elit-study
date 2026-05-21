"use client";

import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/types/task";

export function TaskList() {
  const { tasks, isLoading, deleteTask, toggleStatus } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleToggle = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleStatus(id);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Eliminar esta tarea?")) {
      await deleteTask(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Cargando...</p>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay tareas. ¡Crea tu primera tarea!
          </p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="relative group" onClick={() => handleEdit(task)}>
              <TaskCard task={task} />
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleToggle(task.id, e)}
                  className="text-xs px-2 py-1 rounded bg-surface-alt dark:bg-surface-dark-alt text-foreground hover:text-primary transition-colors"
                >
                  {task.status === "pendiente" ? "Iniciar" : task.status === "en_progreso" ? "Completar" : "Reabrir"}
                </button>
                <button
                  onClick={(e) => handleDelete(task.id, e)}
                  className="text-xs px-2 py-1 rounded bg-surface-alt dark:bg-surface-dark-alt text-red-400 hover:text-red-600 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <TaskModal isOpen={isModalOpen} onClose={handleClose} task={editingTask} />
    </div>
  );
}
