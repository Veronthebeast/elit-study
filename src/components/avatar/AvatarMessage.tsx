"use client";

import { motion } from "framer-motion";

interface AvatarMessageProps {
  text: string;
}

export function AvatarMessage({ text }: AvatarMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      className="absolute bottom-full right-0 mb-3 max-w-[200px]"
    >
      <div className="bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-border p-3 text-sm text-foreground">
        <p>{text}</p>
      </div>
      <div className="absolute -bottom-1 right-4 w-3 h-3 bg-white dark:bg-surface-dark border-r border-b border-border transform rotate-45" />
    </motion.div>
  );
}
