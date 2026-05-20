export interface Task {
  id: string;
  user_id: string;
  title: string;
  subject?: string | null;
  description?: string | null;
  due_date?: string | null;
  priority: "baja" | "media" | "alta";
  status: "pendiente" | "en_progreso" | "finalizada";
  created_at: string;
  updated_at: string;
}

export type TaskFormData = {
  title: string;
  subject?: string;
  description?: string;
  due_date?: string;
  priority?: "baja" | "media" | "alta";
  status?: "pendiente" | "en_progreso" | "finalizada";
};
