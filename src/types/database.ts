export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: UserInsert;
        Update: UserUpdate;
      };
      exams: {
        Row: ExamRow;
        Insert: ExamInsert;
        Update: ExamUpdate;
      };
      tasks: {
        Row: TaskRow;
        Insert: TaskInsert;
        Update: TaskUpdate;
      };
      weekly_schedule: {
        Row: WeeklyScheduleRow;
        Insert: WeeklyScheduleInsert;
        Update: WeeklyScheduleUpdate;
      };
      daily_notes: {
        Row: DailyNoteRow;
        Insert: DailyNoteInsert;
        Update: DailyNoteUpdate;
      };
    };
  };
}

export interface UserRow {
  id: string;
  email: string;
  name: string | null;
  avatar_type: string;
  theme_pref: string;
  created_at: string;
}

export interface UserInsert {
  id: string;
  email: string;
  name?: string | null;
  avatar_type?: string;
  theme_pref?: string;
}

export interface UserUpdate {
  email?: string;
  name?: string | null;
  avatar_type?: string;
  theme_pref?: string;
}

export interface ExamRow {
  id: string;
  user_id: string;
  subject: string;
  title: string | null;
  description: string | null;
  exam_date: string;
  exam_time: string | null;
  exam_type: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ExamInsert {
  user_id: string;
  subject: string;
  title?: string | null;
  description?: string | null;
  exam_date: string;
  exam_time?: string | null;
  exam_type?: string;
  status?: string;
}

export interface ExamUpdate {
  subject?: string;
  title?: string | null;
  description?: string | null;
  exam_date?: string;
  exam_time?: string | null;
  exam_type?: string;
  status?: string;
}

export interface TaskRow {
  id: string;
  user_id: string;
  title: string;
  subject: string | null;
  description: string | null;
  due_date: string | null;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface TaskInsert {
  user_id: string;
  title: string;
  subject?: string | null;
  description?: string | null;
  due_date?: string | null;
  priority?: string;
  status?: string;
}

export interface TaskUpdate {
  title?: string;
  subject?: string | null;
  description?: string | null;
  due_date?: string | null;
  priority?: string;
  status?: string;
}

export interface WeeklyScheduleRow {
  id: string;
  user_id: string;
  day_of_week: number;
  title: string;
  description: string | null;
  start_time: string | null;
  end_time: string | null;
  color: string;
  completed: boolean;
  created_at: string;
}

export interface WeeklyScheduleInsert {
  user_id: string;
  day_of_week: number;
  title: string;
  description?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  color?: string;
  completed?: boolean;
}

export interface WeeklyScheduleUpdate {
  day_of_week?: number;
  title?: string;
  description?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  color?: string;
  completed?: boolean;
}

export interface DailyNoteRow {
  id: string;
  user_id: string;
  note: string;
  note_date: string;
  created_at: string;
}

export interface DailyNoteInsert {
  user_id: string;
  note: string;
  note_date?: string;
}

export interface DailyNoteUpdate {
  note?: string;
  note_date?: string;
}
