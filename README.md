# Elit Study 🎓

Hub universitario personal con asistente avatar. Organiza tus parciales, tareas y horario semanal.

## Stack

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Estilos**: TailwindCSS + modo oscuro/claro
- **Animaciones**: Framer Motion
- **Backend/Database**: Supabase (PostgreSQL + Auth + RLS)
- **Iconos**: Lucide React

## Funcionalidades

- 📊 **Dashboard** — Resumen de parciales, tareas y actividades del día
- 📝 **Parciales** — CRUD completo con tipos (parcial, final, recuperatorio)
- ✅ **Tareas** — CRUD con prioridades y filtros por materia/estado
- 📅 **Calendario Mensual** — Vista de eventos académicos
- 📋 **Cronograma Semanal** — Actividades día por día con checkboxes
- 👁️ **Vista Diaria** — Resumen del día con tareas urgentes
- 🐱 **Avatar Asistente** — Mascota pixel art con 4 estados emocionales
- ⚙️ **Configuración** — Tema oscuro/claro, selector de avatar

## Base de Datos

5 tablas con Row Level Security (RLS): `users`, `exams`, `tasks`, `weekly_schedule`, `daily_notes`

## Desarrollo

```bash
npm run dev
```

Build:

```bash
npm run build
```
