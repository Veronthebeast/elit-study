export const APP_NAME = "Elit Study";
export const APP_DESCRIPTION = "Tu hub universitario personal";

export const PRIORITY_LABELS = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
} as const;

export const STATUS_LABELS = {
  pendiente: "Pendiente",
  en_progreso: "En progreso",
  en_preparacion: "En preparación",
  finalizada: "Finalizada",
  completado: "Completado",
} as const;

export const EXAM_TYPES = [
  { value: "parcial", label: "Parcial" },
  { value: "final", label: "Final" },
  { value: "recuperatorio", label: "Recuperatorio" },
  { value: "otros", label: "Otros" },
] as const;

export const AVATAR_STATES = ["idle", "happy", "worried", "celebrating"] as const;

export const AVATAR_STYLE_OPTIONS = ["cat", "robot", "anime", "pixel"] as const;

export const DAYS_OF_WEEK = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

export const THEME_OPTIONS = ["light", "dark", "system"] as const;
