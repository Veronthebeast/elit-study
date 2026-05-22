"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import { useAvatarState } from "./useAvatarState";
import type { Task, TaskFormData } from "@/types/task";

function toDateString(raw: string | null | undefined): string {
  if (!raw) return "";
  return raw.split("T")[0];
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const { triggerEvent } = useAvatarState();
  const supabaseRef = useRef(createClient());

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    const { data } = await supabaseRef.current
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true });
    if (data) {
      const tasksWithFixedDates = data.map((t: any) => ({
        ...t,
        due_date: toDateString(t.due_date),
      }));
      setTasks(tasksWithFixedDates as Task[]);
    }
    setIsLoading(false);
  }, [user]);

  const createTask = useCallback(async (task: TaskFormData) => {
    if (authLoading) return { data: null, error: new Error("Cargando sesión...") };
    if (!user) return { data: null, error: new Error("Not authenticated") };
    const { data, error } = await supabaseRef.current
      .from("tasks")
      .insert([{ ...task, user_id: user.id }])
      .select()
      .single();
    if (!error && data) {
      setTasks((prev) => [...prev, { ...(data as Task), due_date: toDateString(data.due_date) }]);
    }
    return { data, error };
  }, [user, authLoading]);

  const updateTask = useCallback(async (id: string, updates: Partial<TaskFormData>) => {
    if (!user) return { data: null, error: new Error("Not authenticated") };
    const { data, error } = await supabaseRef.current
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...(data as Task), due_date: toDateString(data.due_date) } : t))
      );
    }
    return { data, error };
  }, [user]);

  const deleteTask = useCallback(async (id: string) => {
    if (!user) return { error: new Error("Not authenticated") };
    const { error } = await supabaseRef.current
      .from("tasks")
      .delete()
      .eq("id", id);
    if (!error) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
    return { error };
  }, [user]);

  const toggleStatus = useCallback(async (id: string) => {
    if (!user) return { data: null, error: new Error("Not authenticated") };
    const task = tasks.find((t) => t.id === id);
    if (!task) return { data: null, error: new Error("Task not found") };

    const statusCycle: Record<string, "pendiente" | "en_progreso" | "finalizada"> = {
      pendiente: "en_progreso",
      en_progreso: "finalizada",
      finalizada: "pendiente",
    };
    const nextStatus = statusCycle[task.status] || "pendiente";

    const { data, error } = await supabaseRef.current
      .from("tasks")
      .update({ status: nextStatus })
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...(data as Task), due_date: toDateString(data.due_date) } : t)));
      if (nextStatus === "finalizada") {
        triggerEvent("task_completed");
      }
    }
    return { data, error };
  }, [user, tasks, triggerEvent]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, isLoading, refetch: fetchTasks, createTask, updateTask, deleteTask, toggleStatus };
}
