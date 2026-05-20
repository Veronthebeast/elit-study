export type AvatarState = "idle" | "happy" | "worried" | "celebrating";

export type AvatarEvent =
  | "exam_added"
  | "task_completed"
  | "task_overdue"
  | "login_streak"
  | "daily_first_visit"
  | "exam_soon";

export type AvatarStyle = "cat" | "robot" | "anime" | "pixel";

export interface AvatarContextType {
  state: AvatarState;
  message: string;
  setState: (state: AvatarState, message?: string) => void;
  triggerEvent: (event: AvatarEvent) => void;
}
