"use client";

import { useContext } from "react";
import { AvatarContext } from "@/contexts/AvatarContext";

export function useAvatarState() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("useAvatarState must be used within an AvatarProvider");
  }
  return context;
}
