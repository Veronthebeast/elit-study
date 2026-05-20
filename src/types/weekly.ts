export interface WeeklyActivity {
  id: string;
  user_id: string;
  day_of_week: number; // 0=domingo, 1=lunes...6=sábado
  title: string;
  description?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  color: string;
  completed: boolean;
  created_at: string;
}

export type WeeklyActivityFormData = {
  day_of_week: number;
  title: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  color?: string;
};
