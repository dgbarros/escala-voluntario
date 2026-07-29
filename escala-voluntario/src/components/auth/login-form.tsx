// src/components/auth/login-form.tsx
"use client";

import { useState } from "react";
import { login } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);

    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-sm">
          <Calendar className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-slate-800">escala</span>
          <span className="text-blue-500">Voluntário</span>
        </h1>
      </div>

      <Card className="w-full max-w-[420px] border-none rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-2">
        <CardHeader className="space-y-2 text-center mt-4">
          <h2 className="text-2xl font-bold text-slate-800">
            Bem-vindo de volta!
          </h2>
          <p className="text-slate-500 text-sm">
            Acesse sua escala e organize seu ministério.
          </p>
        </CardHeader>

        <CardContent className="mt-4 pb-8">
          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-slate-700 font-semibold ml-1"
              >
                E-mail
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  required
                  className="h-12 rounded-2xl border-slate-200 bg-white pl-12 text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label
                  htmlFor="password"
                  className="text-slate-700 font-semibold"
                >
                  Senha
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-2xl border-slate-200 bg-white pl-12 text-slate-600"
                />
              </div>
                <Link
                  href="/recuperar-senha"
                  className="text-sm font-medium text-indigo-500 hover:text-indigo-600 hover:underline"
                >
                  Não lembro ou não tenho a senha
                </Link>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center font-medium bg-red-50 p-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-14 mt-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white font-bold text-base transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
            >
              {isPending ? (
                <>
                  Entrando... <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Entrar <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
