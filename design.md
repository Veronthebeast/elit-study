# Design: MVP Elit Study - Hub Universitario con Avatar

> **Change**: MVP Elit Study - Hub Universitario con Avatar
> **Project**: elit-study
> **Mode**: engram
> **Stack**: Next.js App Router + React 19 + TypeScript + TailwindCSS + Framer Motion + Supabase

---

## 1. Arquitectura de Componentes

### Árbol de Componentes (Layout Jerárquico)

```
RootLayout (src/app/layout.tsx)
├── ThemeProvider (Context)
├── AuthProvider (Supabase Session Context)
├── AvatarProvider (Estado del avatar)
├── Sidebar (Navegación principal)
└── Main Content
    ├── LoginPage
    │   └── AuthForm (Login / Register toggle)
    ├── DashboardPage
    │   ├── DashboardGrid
    │   │   ├── NextExamCard
    │   │   ├── PendingTasksCard
    │   │   ├── MiniCalendar
    │   │   └── TodayActivitiesCard
    │   └── AvatarWidget (flotante)
    ├── ExamsPage
    │   ├── ExamList
    │   ├── ExamCard
    │   └── ExamModal (Create/Edit)
    ├── TasksPage
    │   ├── TaskFilters (por materia/estado)
    │   ├── TaskList
    │   ├── TaskCard
    │   └── TaskModal (Create/Edit)
    ├── CalendarPage
    │   ├── MonthHeader (navegación)
    │   ├── CalendarGrid (días)
    │   ├── DayCell (eventos del día)
    │   └── EventPopover
    ├── WeeklyPage
    │   ├── WeekGrid (7 columnas)
    │   ├── DayColumn
    │   ├── ActivityRow (con checkbox)
    │   └── AddActivityModal
    ├── DailyPage
    │   ├── DayHeader (fecha + mensaje avatar)
    │   ├── TaskTimeline
    │   └── ExamAlerts
    └── SettingsPage
        ├── AvatarCustomizer
        └── ThemeToggle
```

### Organización de Carpetas

```
elit-study/
├── .env.local              # SUPABASE_URL, SUPABASE_ANON_KEY
├── supabase/
│   └── migrations/
│       └── 001_schema.sql  # Schema inicial
├── src/
│   ├── app/
│   │   ├── layout.tsx          # RootLayout (Providers + Sidebar)
│   │   ├── page.tsx            ← Redirect a /dashboard
│   │   ├── login/page.tsx      # Client Component
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx      # Layout protegido (sidebar)
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── exams/page.tsx
│   │   │   ├── tasks/page.tsx
│   │   │   ├── calendar/page.tsx
│   │   │   ├── weekly/page.tsx
│   │   │   ├── daily/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── auth/
│   │       ├── callback/route.ts    # Auth callback
│   │       └── confirm/route.ts     # Email confirmation
│   ├── components/
│   │   ├── ui/                  # Base atómicos
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   └── Badge.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarItem.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── MobileNav.tsx
│   │   ├── avatar/
│   │   │   ├── Avatar.tsx           # Componente principal
│   │   │   ├── AvatarStates.tsx     # SVG/Lottie por estado
│   │   │   ├── AvatarMessage.tsx    # Burbuja de texto
│   │   │   └── avatarLogic.ts       # Lógica de transiciones
│   │   ├── dashboard/
│   │   │   ├── NextExamCard.tsx
│   │   │   ├── PendingTasksCard.tsx
│   │   │   ├── MiniCalendar.tsx
│   │   │   └── TodayActivitiesCard.tsx
│   │   ├── exams/
│   │   │   ├── ExamList.tsx
│   │   │   ├── ExamCard.tsx
│   │   │   └── ExamModal.tsx
│   │   ├── tasks/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskModal.tsx
│   │   │   └── TaskFilters.tsx
│   │   ├── calendar/
│   │   │   ├── CalendarGrid.tsx
│   │   │   ├── MonthHeader.tsx
│   │   │   ├── DayCell.tsx
│   │   │   └── EventPopover.tsx
│   │   ├── weekly/
│   │   │   ├── WeekGrid.tsx
│   │   │   ├── DayColumn.tsx
│   │   │   ├── ActivityRow.tsx
│   │   │   └── AddActivityModal.tsx
│   │   └── daily/
│   │       ├── DayHeader.tsx
│   │       ├── TaskTimeline.tsx
│   │       └── ExamAlerts.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Supabase browser client
│   │   │   ├── server.ts        # Supabase server client
│   │   │   ├── middleware.ts    # Auth middleware
│   │   │   └── admin.ts        # Service role client (admin ops)
│   │   ├── utils.ts            # Helpers (cn, date formatting)
│   │   └── constants.ts        # Constantes de la app
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useExams.ts
│   │   ├── useTasks.ts
│   │   ├── useWeeklySchedule.ts
│   │   ├── useAvatarState.ts
│   │   └── useTheme.ts
│   ├── contexts/
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── AvatarContext.tsx
│   ├── styles/
│   │   └── globals.css       # Tailwind directives + custom vars
│   └── types/
│       ├── database.ts       # Tipos de Supabase (generados)
│       ├── exam.ts
│       ├── task.ts
│       ├── weekly.ts
│       └── avatar.ts
└── tailwind.config.ts
```

---

## 2. Decisiones de Arquitectura

| Decisión | Opciones | Elección | Rationale |
|----------|----------|----------|-----------|
| **Auth** | Supabase Auth vs NextAuth vs Clerk | **Supabase Auth** | Stack unificado (DB + Auth en mismo servicio); RLS se integra directo; evita dependencias externas |
| **Estado global** | Context vs Zustand vs Redux | **React Context** | MVP con estado simple (auth, tema, avatar); Context alcanza sin peso extra de librerías |
| **ORM/SQL** | Prisma vs Drizzle vs raw SQL | **Supabase JS Client** | Sin capa ORM extra; client tipado de Supabase + `supabase gen types` genera tipos de DB |
| **Server/Client pattern** | RSC vs CSR | **Client Components en páginas interactivas** | Dashboard, CRUDs, calendario son altamente interactivos; Server Components para layout y data fetching simple |
| **Animaciones avatar** | Lottie vs CSS vs SVG + Framer Motion | **SVG React + Framer Motion** | Sin asset externo ni carga extra; SVG inline permite animaciones programáticas con variants de Framer Motion |
| **Calendario** | shadcn/ui Calendar vs FullCalendar vs custom | **Custom con Tailwind** | Sin dependencia extra; control total de diseño; MVP no necesita features complejas de FullCalendar |
| **Sidebar** | Drawer fijo vs overlay vs bottom nav | **Sidebar responsive: fijo en desktop, bottom nav en mobile** | Patrón probado en dashboards; Tailwind `lg:` breakpoint para switchear |

---

## 3. Flujo de Datos

### Server Components vs Client Components

```
Server Components (src/app/(dashboard)/layout.tsx):
  └─ Obtiene sesión de Supabase (createServerClient)
  └─ Renderiza Sidebar (datos estáticos)
  └─ Envuelve children en AuthProvider

Client Components (páginas y features):
  └─ DashboardPage, ExamsPage, TasksPage, CalendarPage, etc.
  └─ useAuth() para obtener user/session
  └─ Supabase browser client para queries
  └─ useExams(), useTasks(), etc. encapsulan fetching
```

### Estrategia de Fetching

```
                    ┌──────────────────┐
                    │   Server Action   │
                    │  (si es necesario)│
                    └────────┬─────────┘
                             │
┌────────┐    CSR fetch     ┌▼────────┐    SQL     ┌───────────┐
│ Client ├─────────────────►│ use*()  ├───────────►│ Supabase  │
│Component│  supabase.from() │  Hook   │  RLS filter │ PostgreSQL│
└────────┘                  └─────────┘            └───────────┘
```

- **Page data** → CSR con `useEffect` + `supabase.from('exams').select('*').eq('user_id', user.id)`. En MVP no hay SSR para datos de dashboard (CSR es suficiente y más simple).
- **SWR/React Query**: Opcional post-MVP. Para MVP, estado local con `useState` + `useEffect` es suficiente.
- **Optimistic updates**: Al marcar tarea como completada, actualizar UI inmediatamente + revalidar.

### Diagrama de Flujo: Crear Parcial

```
User
  │ Click "Agregar Parcial"
  ▼
ExamModal (Client Component)
  │ Formulario → validación
  │ HandleSubmit()
  ▼
supabase.from('exams').insert({...examData, user_id: session.user.id})
  │ RLS policy verifica user_id = auth.uid()
  ▼
  │ Exito → close modal, refetch list
  │ Error → show toast error
  ▼
ExamList se actualiza con los datos nuevos
AvatarContext.update(examAdded)
  ▼
AvatarState cambia a "feliz" (nuevo logro)
```

---

## 4. Diseño del Componente Avatar

### Estados y Transiciones

```typescript
// src/types/avatar.ts
export type AvatarState = 'idle' | 'happy' | 'worried' | 'celebrating';

export interface AvatarContextType {
  state: AvatarState;
  message: string;
  setState: (state: AvatarState, message?: string) => void;
  triggerEvent: (event: AvatarEvent) => void;
}

export type AvatarEvent =
  | 'exam_added'
  | 'task_completed'
  | 'task_overdue'
  | 'login_streak'
  | 'daily_first_visit'
  | 'exam_soon';
```

### Lógica de Transiciones

```
Evento recibido ──► Mapeo a estado + mensaje
                         │
                    ┌────▼────┐
                    │ Evaluar  │
                    │ urgencia │
                    └────┬────┘
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           happy     worried   celebrating
              │          │          │
              └──────┬───┘──────────┘
                     ▼
                  idle (tras 5s)
```

```typescript
// src/components/avatar/avatarLogic.ts
const EVENT_STATE_MAP: Record<AvatarEvent, { state: AvatarState; message: string }> = {
  task_completed: {
    state: 'happy',
    message: '¡Buen trabajo! Sigue así 🎯',
  },
  exam_added: {
    state: 'happy',
    message: '¡Nuevo parcial registrado! A estudiar 📚',
  },
  task_overdue: {
    state: 'worried',
    message: 'Tienes tareas vencidas... ¡ponte al día! ⏰',
  },
  exam_soon: {
    state: 'worried',
    message: '¡Tu parcial de {subject} es mañana!',
  },
  login_streak: {
    state: 'celebrating',
    message: '¡Racha de {days} días! Increíble 🎉',
  },
  daily_first_visit: {
    state: 'idle',
    message: '¡Buen día! Hoy tienes {tasks} tareas pendientes',
  },
};
```

### Implementación con Framer Motion

```tsx
// src/components/avatar/Avatar.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { AvatarState } from '@/types/avatar';

const variants: Record<AvatarState, object> = {
  idle: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.3 },
  },
  happy: {
    scale: [1, 1.15, 1],
    rotate: [0, -10, 10, 0],
    transition: { duration: 0.5 },
  },
  worried: {
    y: [0, -5, 0],
    transition: { duration: 0.4, repeat: 2 },
  },
  celebrating: {
    scale: [1, 1.2, 1],
    rotate: [0, -15, 15, -15, 0],
    transition: { duration: 0.7 },
  },
};

export function Avatar({ state, message }: { state: AvatarState; message: string }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          variants={variants}
          animate={state}
          className="w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-500 
                     rounded-full flex items-center justify-center cursor-pointer
                     shadow-lg"
        >
          {/* SVG inline del personaje según estado */}
          <AvatarCharacter state={state} />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {message && <AvatarMessage text={message} />}
      </AnimatePresence>
    </div>
  );
}
```

El personaje SVG es minimalista estilo "mascota virtual": un círculo con ojos expresivos que cambian según estado (ojos grandes en worried, sonrisa en happy, estrellas en celebrating).

---

## 5. Diseño de Base de Datos

### Schema SQL Completo

```sql
-- 001_schema.sql

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
  day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=domingo, 1=lunes...
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
```

### Row Level Security (RLS)

```sql
-- Activar RLS en todas las tablas
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

-- Users: el usuario ve su propio perfil; se crea automáticamente via trigger
CREATE POLICY user_self ON public.users
  FOR ALL USING (auth.uid() = id);
```

### Trigger: Auto-create user on signup

```sql
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
```

### Índices Recomendados

```sql
CREATE INDEX idx_exams_user_date ON public.exams(user_id, exam_date);
CREATE INDEX idx_exams_status ON public.exams(user_id, status);
CREATE INDEX idx_tasks_user_date ON public.tasks(user_id, due_date);
CREATE INDEX idx_tasks_status ON public.tasks(user_id, status);
CREATE INDEX idx_tasks_priority ON public.tasks(user_id, priority);
CREATE INDEX idx_weekly_user_day ON public.weekly_schedule(user_id, day_of_week);
CREATE INDEX idx_daily_notes_user_date ON public.daily_notes(user_id, note_date);
```

---

## 6. Estrategia de Autenticación

### Setup Supabase Auth

```typescript
// src/lib/supabase/client.ts (browser)
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// src/lib/supabase/server.ts (Server Component / Route Handler)
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(),
                 setAll: (cookiesToSet) => cookiesToSet.forEach(...) } }
  );
}
```

### Middleware de Protección de Rutas

```typescript
// src/lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => request.cookies.getAll(),
                 setAll: (cookiesToSet) => { cookiesToSet.forEach(...) } } }
  );
  const { data: { user } } = await supabase.auth.getUser();

  const isLoggedIn = !!user;
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return supabaseResponse;
}
```

```typescript
// middleware.ts (raíz)
import { updateSession } from '@/lib/supabase/middleware';
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
```

### Manejo de Sesión en Cliente

```typescript
// src/contexts/AuthContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, supabase }}>{children}</AuthContext.Provider>;
}
```

---

## 7. Tema Oscuro/Claro

### Estrategia con TailwindCSS `class` Strategy

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class', // ← class strategy
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#eff6ff', 500: '#6366f1', 600: '#4f46e5' },
        surface: { light: '#ffffff', dark: '#1e1e2e' },
      },
    },
  },
};
```

### ThemeContext

```typescript
// src/contexts/ThemeContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    const stored = localStorage.getItem('elit-theme') as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') { root.classList.add('dark'); }
    else if (theme === 'light') { root.classList.remove('dark'); }
    else {
      // system preference
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.matches) root.classList.add('dark');
      else root.classList.remove('dark');
    }
    localStorage.setItem('elit-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
```

El RootLayout aplica `dark:` clases en todos los componentes. Ejemplo:

```tsx
// Sidebar background
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

---

## 8. Archivos Afectados

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `package.json` | Crear | Deps: next, react, tailwindcss, framer-motion, @supabase/ssr, @supabase/supabase-js |
| `next.config.ts` | Crear | Config Next.js |
| `tailwind.config.ts` | Crear | Tailwind con `darkMode: 'class'`, colores extendidos |
| `tsconfig.json` | Crear | TypeScript config |
| `middleware.ts` | Crear | Protección de rutas con Supabase Auth |
| `.env.local` | Crear | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `supabase/migrations/001_schema.sql` | Crear | Schema + RLS + triggers + índices |
| `src/app/layout.tsx` | Crear | Root layout con providers |
| `src/app/page.tsx` | Crear | Redirect a /dashboard |
| `src/app/login/page.tsx` | Crear | Login / Register |
| `src/app/(dashboard)/layout.tsx` | Crear | Layout protegido con Sidebar |
| `src/app/(dashboard)/dashboard/page.tsx` | Crear | Dashboard |
| `src/app/(dashboard)/exams/page.tsx` | Crear | CRUD parciales |
| `src/app/(dashboard)/tasks/page.tsx` | Crear | CRUD tareas |
| `src/app/(dashboard)/calendar/page.tsx` | Crear | Calendario mensual |
| `src/app/(dashboard)/weekly/page.tsx` | Crear | Cronograma semanal |
| `src/app/(dashboard)/daily/page.tsx` | Crear | Vista diaria |
| `src/app/(dashboard)/settings/page.tsx` | Crear | Configuración |
| `src/app/auth/callback/route.ts` | Crear | Auth callback |
| `src/components/ui/*` (7) | Crear | Componentes atómicos |
| `src/components/layout/*` (4) | Crear | Sidebar, Navbar, MobileNav |
| `src/components/avatar/*` (4) | Crear | Avatar + estados + lógica |
| `src/components/dashboard/*` (4) | Crear | Cards del dashboard |
| `src/components/exams/*` (3) | Crear | Exam list/card/modal |
| `src/components/tasks/*` (4) | Crear | Task list/card/modal/filters |
| `src/components/calendar/*` (4) | Crear | Calendar grid/header/cell |
| `src/components/weekly/*` (4) | Crear | Week grid/day/activity |
| `src/components/daily/*` (3) | Crear | Day header/timeline/alerts |
| `src/lib/supabase/*` (4) | Crear | Supabase clients + middleware |
| `src/lib/utils.ts` | Crear | Helpers |
| `src/types/*` (5) | Crear | TypeScript types |
| `src/hooks/*` (6) | Crear | Custom hooks |
| `src/contexts/*` (3) | Crear | Auth, Theme, Avatar contexts |
| `src/styles/globals.css` | Crear | Tailwind directives |

**Total**: ~50+ archivos nuevos, 0 modificados, 0 eliminados (greenfield).

---

## 9. Estrategia de Testing

| Capa | Qué probar | Enfoque |
|------|-----------|---------|
| **Unit** | Hooks (useAvatarState, useTheme), Utils (date formatting, avatarLogic), | Vitest + React Testing Library |
| **Integration** | Flujo CRUD (crear tarea → ver en lista), Auth (login → redirect dashboard), Avatar transitions | Vitest + MSW para mockear Supabase |
| **E2E** | Registro → crear parcial → crear tarea → ver calendario → toggle tema | Cypress o Playwright (post-MVP) |

---

## Preguntas Abiertas

- [ ] Definir el diseño visual del avatar SVG (gato, robot, anime o pixel art). El PRD sugiere personaje tipo mascota virtual. Propongo personaje simple tipo "búho" (símbolo de estudio) con ojos expresivos — fácil de animar con SVG puro.
- [ ] Decide: nombre de la paleta de colores exacta en tailwind.config (los del PRD: azul suave, blanco, gris claro, detalles violeta). Propongo: primary = indigo/violeta, surface = white/gray-50, accent = purple.
- [ ] Confirmar si usamos shadcn/ui como base de componentes o construimos todo custom. Propongo shadcn/ui por rapidez (componentes accesibles ya hechos), pero no incluido en stack del PRD.

---

## 10. Migración / Rollout

**No se requiere migración** — proyecto greenfield. El schema SQL se aplica directamente en el proyecto Supabase. Rollback: cada commit funcional es checkpoint; si algo falla, `git revert` al commit anterior.

---

## 11. Riesgos

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Dependencia de credenciales Supabase activas | Media | Documentar setup en README; crear script `supabase/seed.sql` con datos mock para desarrollo sin conexión |
| Scope creep en UI del avatar | Media | Definir solo 4 estados; congelar diseño post-MVP |
| Complejidad del calendario custom | Media | Usar librería `date-fns` para navegación entre meses; no reinventar lógica de fechas |
| Sidebar responsive en mobile | Baja | Implementar con Tailwind `lg:` breakpoint + bottom navigation en mobile (patrón probado) |
