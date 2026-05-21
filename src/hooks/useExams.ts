"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";
import { useAvatarState } from "./useAvatarState";
import type { Exam, ExamFormData } from "@/types/exam";

export function useExams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { triggerEvent } = useAvatarState();
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

  const createExam = useCallback(async (exam: ExamFormData) => {
    if (!user) return { data: null, error: new Error("Not authenticated") };
    const { data, error } = await supabase
      .from("exams")
      .insert([{ ...exam, user_id: user.id }])
      .select()
      .single();
    if (!error && data) {
      setExams((prev) => [...prev, data as Exam]);
      triggerEvent("exam_added");
    }
    return { data, error };
  }, [user, supabase, triggerEvent]);

  const updateExam = useCallback(async (id: string, updates: Partial<ExamFormData>) => {
    if (!user) return { data: null, error: new Error("Not authenticated") };
    const { data, error } = await supabase
      .from("exams")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (!error && data) {
      setExams((prev) => prev.map((e) => (e.id === id ? (data as Exam) : e)));
    }
    return { data, error };
  }, [user, supabase]);

  const deleteExam = useCallback(async (id: string) => {
    if (!user) return { error: new Error("Not authenticated") };
    const { error } = await supabase
      .from("exams")
      .delete()
      .eq("id", id);
    if (!error) {
      setExams((prev) => prev.filter((e) => e.id !== id));
    }
    return { error };
  }, [user, supabase]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return { exams, isLoading, refetch: fetchExams, createExam, updateExam, deleteExam };
}
