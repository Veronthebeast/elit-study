"use client";

import { createContext, useState, useCallback, useRef, useMemo, type ReactNode } from "react";
import type { AvatarState, AvatarEvent } from "@/types/avatar";
import { EVENT_STATE_MAP } from "@/components/avatar/avatarLogic";

interface AvatarContextType {
  state: AvatarState;
  message: string;
  setState: (state: AvatarState, message?: string) => void;
  triggerEvent: (event: AvatarEvent) => void;
}

export const AvatarContext = createContext<AvatarContextType | null>(null);

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [state, setAvatarState] = useState<AvatarState>("idle");
  const [message, setMessage] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setState = useCallback((newState: AvatarState, newMessage?: string) => {
    setAvatarState(newState);
    if (newMessage) setMessage(newMessage);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setAvatarState("idle");
      setMessage("");
    }, 5000);
  }, []);

  const triggerEvent = useCallback(
    (event: AvatarEvent) => {
      const mapping = EVENT_STATE_MAP[event];
      if (mapping) {
        setState(mapping.state, mapping.message);
      }
    },
    [setState]
  );

  const value = useMemo(
    () => ({ state, message, setState, triggerEvent }),
    [state, message, setState, triggerEvent]
  );

  return (
    <AvatarContext.Provider value={value}>
      {children}
    </AvatarContext.Provider>
  );
}
