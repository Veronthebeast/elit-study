"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import type { WeeklyActivity } from "@/types/weekly";

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

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return { activities, isLoading, refetch: fetchActivities };
}
