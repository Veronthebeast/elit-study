# PRD — Elit Study

## Ruta del proyecto
El proyecto debe crearse en la siguiente ubicación:

```txt
C:\Users\USER\elit study
```

## 1. Objetivo del proyecto
Crear una aplicación llamada “Elit Study” para estudiantes universitarios que permita organizar parciales, tareas y actividades semanales, integrando un asistente virtual con avatar.

El sistema debe enfocarse en:
- Organización académica.
- Gestión semanal de actividades.
- Visualización clara de fechas importantes.
- Interacción amigable mediante un avatar.

---

# 2. Idea general
La aplicación funcionará como un “hub universitario” personal.

El usuario podrá:
- Agregar parciales.
- Agregar tareas.
- Ver un calendario.
- Organizar un cronograma semanal.
- Tener una vista diaria de pendientes.
- Interactuar con un asistente/avatar.

El objetivo NO es crear una IA compleja, sino una experiencia práctica y simple.

---

# 3. Funcionalidades principales

## 3.1 Dashboard principal
Pantalla inicial con:
- Próximos parciales.
- Tareas pendientes.
- Actividades del día.
- Resumen semanal.
- Avatar del asistente.

### Componentes:
- Tarjeta “Próximo parcial”.
- Tarjeta “Tareas pendientes”.
- Calendario mini.
- Lista de actividades de hoy.
- Avatar flotante.

---

## 3.2 Gestión de parciales
El usuario podrá crear y administrar parciales.

### Datos del parcial:
- Materia.
- Fecha.
- Hora.
- Tipo de examen.
- Descripción.
- Estado:
  - Pendiente.
  - En preparación.
  - Completado.

### Funciones:
- Crear parcial.
- Editar parcial.
- Eliminar parcial.
- Ver próximos parciales.
- Ordenar por fecha.

---

## 3.3 Gestión de tareas
El usuario podrá registrar tareas y trabajos prácticos.

### Datos de la tarea:
- Título.
- Materia.
- Fecha límite.
- Prioridad:
  - Baja.
  - Media.
  - Alta.
- Descripción.
- Estado:
  - Pendiente.
  - En progreso.
  - Finalizada.

### Funciones:
- Crear tarea.
- Marcar como completada.
- Editar.
- Eliminar.
- Filtrar por materia.
- Filtrar por estado.

---

## 3.4 Calendario
Vista de calendario mensual.

### Debe mostrar:
- Parciales.
- Tareas.
- Actividades semanales.

### Funciones:
- Click en un día.
- Ver eventos.
- Crear evento rápido.
- Navegar entre meses.

---

## 3.5 Cronograma semanal
Vista organizada por días de la semana.

### El usuario podrá:
- Agregar actividades.
- Organizar horarios.
- Planificar estudio.
- Crear rutinas.

### Ejemplos:
- Estudiar Matemática.
- Hacer TP de Programación.
- Leer apuntes.
- Reunión de grupo.

### Formato sugerido:
- Lunes.
- Martes.
- Miércoles.
- Jueves.
- Viernes.
- Sábado.
- Domingo.

Cada día tendrá:
- Lista de actividades.
- Horario opcional.
- Checkbox de completado.

---

## 3.6 Vista diaria
Pantalla dedicada al día actual.

### Debe mostrar:
- Fecha actual.
- Actividades del día.
- Tareas urgentes.
- Próximos parciales.
- Mensaje del avatar.

### Ejemplo:
“Hoy tienes 2 tareas pendientes y un parcial en 3 días.”

---

## 3.7 Avatar del asistente
El sistema tendrá un avatar visual.

## Objetivo del avatar
Hacer la aplicación más amigable y divertida.

### Funciones del avatar:
- Dar mensajes motivacionales.
- Recordar tareas.
- Mostrar alertas.
- Acompañar la experiencia.

### Ejemplos:
- “No olvides estudiar Física hoy.”
- “Tienes un parcial mañana.”
- “Buen trabajo completando tareas.”

### Estilo visual:
- Minimalista.
- Animado simple.
- Tipo mascota virtual.
- Puede ser:
  - Gato.
  - Robot.
  - Personaje anime.
  - Pixel art.

### Comportamientos:
- Idle.
- Feliz.
- Preocupado.
- Celebrando.

---

# 4. Tecnologías recomendadas

## Frontend
- Next.js.
- React.
- TailwindCSS.
- Framer Motion.

## Backend
Opción simple:
- Supabase.

## Base de datos
- PostgreSQL (Supabase).

## Autenticación
- Login con email.
- Google opcional.

---

# 5. Estructura de pantallas

## Pantallas principales

### 1. Login
- Iniciar sesión.
- Registrarse.

### 2. Dashboard
- Resumen general.

### 3. Parciales
- CRUD de parciales.

### 4. Tareas
- CRUD de tareas.

### 5. Calendario
- Vista mensual.

### 6. Semana
- Cronograma semanal.

### 7. Día
- Vista diaria.

### 8. Configuración
- Cambiar avatar.
- Tema oscuro/claro.

---

# 6. Base de datos sugerida

## Tabla: users
- id
- email
- name
- avatar
- created_at

## Tabla: exams
- id
- user_id
- subject
- title
- description
- exam_date
- status

## Tabla: tasks
- id
- user_id
- title
- subject
- description
- due_date
- priority
- status

## Tabla: weekly_schedule
- id
- user_id
- day_of_week
- title
- start_time
- completed

## Tabla: daily_notes
- id
- user_id
- note
- created_at

---

# 7. Diseño UI/UX

## Estilo visual
- Minimalista.
- Moderno.
- Estilo estudiante/productividad.

## Colores sugeridos
- Azul suave.
- Blanco.
- Gris claro.
- Detalles violeta.

## Diseño responsive
Debe funcionar en:
- Desktop.
- Tablet.
- Mobile.

---

# 8. MVP inicial

## Funciones mínimas para lanzar

### Obligatorio
- Login.
- Crear tareas.
- Crear parciales.
- Calendario.
- Cronograma semanal.
- Vista diaria.
- Avatar simple.

### Opcional después
- IA real.
- Notificaciones.
- Integración Google Calendar.
- Estadísticas.
- Gamificación.

---

# 9. Ideas futuras

## Posibles mejoras
- Chat con IA.
- Resumen automático de apuntes.
- Pomodoro integrado.
- Sistema de niveles.
- Rachas de estudio.
- Sincronización móvil.
- Widgets.
- Modo enfoque.

---

# 10. Flujo básico del usuario

1. El usuario inicia sesión.
2. Entra al dashboard.
3. Agrega parciales.
4. Agrega tareas.
5. Organiza la semana.
6. Consulta el calendario.
7. El avatar le recuerda pendientes.
8. Marca tareas como completadas.

---

# 11. Objetivo técnico

La app debe:
- Ser rápida.
- Fácil de usar.
- Visualmente agradable.
- Escalable.
- Fácil de mantener.

El foco principal es simplicidad y productividad.

