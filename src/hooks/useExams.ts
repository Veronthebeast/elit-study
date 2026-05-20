"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import type { Exam } from "@/types/exam";

export function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const supabase = createClient();

  const fetchExams = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    const { data } = await supabase
      .from("exams")
      .select("*")
      .eq("user_id", user.id)
      .order("exam_date", { ascending: true });
    if (data) setExams(data as Exam[]);
    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return { exams, isLoading, refetch: fetchExams };
}
