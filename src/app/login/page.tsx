"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AvatarCharacter } from "@/components/avatar/AvatarStates";

const AuthForm = dynamic(
  () => import("@/components/ui/AuthForm").then((mod) => mod.AuthForm),
  { ssr: false }
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const avatarContainerVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface via-surface to-primary-50/50 dark:from-surface-dark dark:via-surface-dark dark:to-primary-950/30 p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar Container */}
        <motion.div
          className="flex justify-center mb-6"
          variants={avatarContainerVariants}
          whileHover={{ scale: 1.03, rotate: -1 }}
        >
          <div className="relative">
            {/* Glow effect behind avatar */}
            <div className="absolute inset-0 bg-primary-500/20 dark:bg-primary-400/20 blur-3xl rounded-full scale-150" />
            
            {/* Subtle floating animation container */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative"
            >
              <div className="w-[150px] h-[180px] flex items-center justify-center">
                <AvatarCharacter state="happy" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 dark:from-primary-400 dark:via-primary-300 dark:to-accent-400 bg-clip-text text-transparent">
              Elit Study
            </h1>
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-lg text-muted-foreground mt-3">
            Tu hub universitario personal
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span>📚</span> Parciales
            </span>
            <span className="flex items-center gap-1">
              <span>📝</span> Tareas
            </span>
            <span className="flex items-center gap-1">
              <span>📅</span> Calendario
            </span>
          </div>
        </motion.div>

        {/* Auth Form */}
        <motion.div variants={itemVariants}>
          <AuthForm />
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-8"
          variants={itemVariants}
        >
          Hecho con 💜 para estudiantes universitarios
        </motion.p>
      </motion.div>
    </div>
  );
}
