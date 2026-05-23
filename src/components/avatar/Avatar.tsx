"use client";

import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAvatarState } from "@/hooks/useAvatarState";
import { AvatarCharacter } from "./AvatarStates";
import { AvatarMessage } from "./AvatarMessage";

export const Avatar = memo(function Avatar() {
  const { state, message } = useAvatarState();

  const variants = {
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

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={state}
          variants={variants}
          animate={state}
          className="w-28 h-36 lg:w-32 lg:h-40 
                     rounded-2xl flex items-center justify-center cursor-pointer
                     shadow-lg hover:shadow-xl transition-shadow overflow-hidden
                     bg-white dark:bg-surface-dark border border-border"
        >
          <AvatarCharacter state={state} />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {message && <AvatarMessage text={message} />}
      </AnimatePresence>
    </div>
  );
});
