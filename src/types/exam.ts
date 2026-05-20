export interface Exam {
  id: string;
  user_id: string;
  subject: string;
  title?: string | null;
  description?: string | null;
  exam_date: string;
  exam_time?: string | null;
  exam_type: "parcial" | "final" | "recuperatorio" | "otros";
  status: "pendiente" | "en_preparacion" | "completado";
  created_at: string;
  updated_at: string;
}

export type ExamFormData = {
  subject: string;
  title?: string;
  description?: string;
  exam_date: string;
  exam_time?: string;
  exam_type?: "parcial" | "final" | "recuperatorio" | "otros";
  status?: "pendiente" | "en_preparacion" | "completado";
};
