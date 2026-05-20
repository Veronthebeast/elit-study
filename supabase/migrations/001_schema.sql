-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS (sync con Supabase Auth)
-- ============================================
CREATE TABLE public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  name        TEXT,
  avatar_type TEXT DEFAULT 'cat' CHECK (avatar_type IN ('cat', 'robot', 'anime', 'pixel')),
  theme_pref  TEXT DEFAULT 'system' CHECK (theme_pref IN ('light', 'dark', 'system')),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EXAMS (parciales)
-- ============================================
CREATE TABLE public.exams (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,
  title       TEXT,
  description TEXT,
  exam_date   DATE NOT NULL,
  exam_time   TIME,
  exam_type   TEXT DEFAULT 'parcial' CHECK (exam_type IN ('parcial', 'final', 'recuperatorio', 'otros')),
  status      TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'en_preparacion', 'completado')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TASKS (tareas / trabajos prácticos)
-- ============================================
CREATE TABLE public.tasks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  subject     TEXT,
  description TEXT,
  due_date    DATE,
  priority    TEXT DEFAULT 'media' CHECK (priority IN ('baja', 'media', 'alta')),
  status      TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'en_progreso', 'finalizada')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- WEEKLY SCHEDULE (cronograma semanal)
-- ============================================
CREATE TABLE public.weekly_schedule (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  title       TEXT NOT NULL,
  description TEXT,
  start_time  TIME,
  end_time    TIME,
  color       TEXT DEFAULT '#6366f1',
  completed   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DAILY NOTES (notas / recordatorios diarios)
-- ============================================
CREATE TABLE public.daily_notes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  note        TEXT NOT NULL,
  note_date   DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_schedule ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_notes ENABLE ROW LEVEL SECURITY;

-- Política: cada usuario ve/edita solo sus propios datos
CREATE POLICY user_isolation ON public.exams
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY user_isolation ON public.tasks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY user_isolation ON public.weekly_schedule
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY user_isolation ON public.daily_notes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY user_self ON public.users
  FOR ALL USING (auth.uid() = id);

-- ============================================
-- TRIGGER: Auto-create user on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ÍNDICES RECOMENDADOS
-- ============================================
CREATE INDEX idx_exams_user_date ON public.exams(user_id, exam_date);
CREATE INDEX idx_exams_status ON public.exams(user_id, status);
CREATE INDEX idx_tasks_user_date ON public.tasks(user_id, due_date);
CREATE INDEX idx_tasks_status ON public.tasks(user_id, status);
CREATE INDEX idx_tasks_priority ON public.tasks(user_id, priority);
CREATE INDEX idx_weekly_user_day ON public.weekly_schedule(user_id, day_of_week);
CREATE INDEX idx_daily_notes_user_date ON public.daily_notes(user_id, note_date);
