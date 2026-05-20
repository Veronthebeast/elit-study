import type { AvatarEvent, AvatarState } from "@/types/avatar";

interface EventMapping {
  state: AvatarState;
  message: string;
}

export const EVENT_STATE_MAP: Record<AvatarEvent, EventMapping> = {
  task_completed: {
    state: "happy",
    message: "¡Buen trabajo! Sigue así 🎯",
  },
  exam_added: {
    state: "happy",
    message: "¡Nuevo parcial registrado! A estudiar 📚",
  },
  task_overdue: {
    state: "worried",
    message: "Tienes tareas vencidas... ¡ponte al día! ⏰",
  },
  exam_soon: {
    state: "worried",
    message: "¡Tu parcial es mañana!",
  },
  login_streak: {
    state: "celebrating",
    message: "¡Racha increíble! Sigue así 🎉",
  },
  daily_first_visit: {
    state: "idle",
    message: "¡Buen día! Revisa tus tareas pendientes",
  },
};
