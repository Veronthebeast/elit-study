"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import type { WeeklyActivity, WeeklyActivityFormData } from "@/types/weekly";

export function useWeeklySchedule() {
  const [activities, setActivities] = useState<WeeklyActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  const fetchActivities = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    const { data } = await supabase
      .from("weekly_schedule")
      .select("*")
      .eq("user_id", user.id)
      .order("day_of_week", { ascending: true });
    if (data) setActivities(data as WeeklyActivity[]);
    setIsLoading(false);
  }, [user, supabase]);

  const createActivity = useCallback(async (activity: WeeklyActivityFormData) => {
    if (!user) return { data: null, error: new Error("Not authenticated") };
    const { data, error } = await supabase
      .from("weekly_schedule")
      .insert([{ ...activity, user_id: user.id }])
      .select()
      .single();
    if (!error && data) {
      setActivities((prev) => [...prev, data as WeeklyActivity]);
    }
    return { data, error };
  }, [user, supabase]);

  const updateActivity = useCallback(
    async (id: string, updates: Partial<WeeklyActivityFormData & { completed?: boolean }>) => {
      if (!user) return { data: null, error: new Error("Not authenticated") };
      const { data, error } = await supabase
        .from("weekly_schedule")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        setActivities((prev) => prev.map((a) => (a.id === id ? (data as WeeklyActivity) : a)));
      }
      return { data, error };
    },
    [user, supabase]
  );

  const deleteActivity = useCallback(async (id: string) => {
    if (!user) return { error: new Error("Not authenticated") };
    const { error } = await supabase
      .from("weekly_schedule")
      .delete()
      .eq("id", id);
    if (!error) {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    }
    return { error };
  }, [user, supabase]);

  const toggleActivityCompletion = useCallback(
    async (id: string) => {
      if (!user) return { data: null, error: new Error("Not authenticated") };
      const activity = activities.find((a) => a.id === id);
      if (!activity) return { data: null, error: new Error("Activity not found") };

      const { data, error } = await supabase
        .from("weekly_schedule")
        .update({ completed: !activity.completed })
        .eq("id", id)
        .select()
        .single();
      if (!error && data) {
        setActivities((prev) => prev.map((a) => (a.id === id ? (data as WeeklyActivity) : a)));
      }
      return { data, error };
    },
    [user, supabase, activities]
  );

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    activities,
    isLoading,
    refetch: fetchActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    toggleActivityCompletion,
  };
}
