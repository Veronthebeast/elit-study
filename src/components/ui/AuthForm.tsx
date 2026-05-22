"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "./Button";
import { Input } from "./Input";

export function AuthForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSignedUp(false);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Redirect after successful login
        router.push("/dashboard");
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // Supabase project requires email confirmation (mailer_autoconfirm: false)
        // If session is null, the user needs to confirm their email
        if (!data.session) {
          setIsSignedUp(true);
        } else {
          // Auto-confirmed — redirect straight to dashboard
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-border">
      <h2 className="text-xl font-semibold text-center text-foreground">
        {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
      </h2>

      {error && (
        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {isSignedUp ? (
        <div className="p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm space-y-2">
          <p className="font-medium">¡Cuenta creada exitosamente!</p>
          <p>Te enviamos un enlace de confirmación a <strong>{email}</strong>.</p>
          <p>Revisá tu bandeja de entrada y hacé clic en el enlace para activar tu cuenta. Luego podés iniciar sesión.</p>
          <button
            type="button"
            onClick={() => { setIsSignedUp(false); setIsLogin(true); }}
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Volver a inicio de sesión
          </button>
        </div>
      ) : (
        <>
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </button>
          </p>
        </>
      )}
    </form>
  );
}
