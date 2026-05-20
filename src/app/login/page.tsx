"use client";

import dynamic from "next/dynamic";

const AuthForm = dynamic(
  () => import("@/components/ui/AuthForm").then((mod) => mod.AuthForm),
  { ssr: false }
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            Elit Study
          </h1>
          <p className="text-muted-foreground mt-2">
            Tu hub universitario personal
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
