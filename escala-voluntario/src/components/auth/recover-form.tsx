'use client'

import { useState } from "react"
import Link from "next/link"
// import { resetPassword } from "@/actions/auth.actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react"

export function RecoverForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {

    alert("E-mail enviado para recuperação de senha")
    // setIsPending(true)
    // setError(null)
    // setSuccess(null)
    
    // const result = await resetPassword(formData)
    
    // if (result?.error) {
    //   setError(result.error)
    // } else if (result?.success) {
    //   setSuccess(result.success)
    // }
    
    // setIsPending(false)
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
          <h2 className="text-2xl font-bold text-slate-800">Recuperar Senha</h2>
          <p className="text-slate-500 text-sm">
            Digite seu e-mail e enviaremos um link para você redefinir sua senha.
          </p>
        </CardHeader>
        
        <CardContent className="mt-4 pb-8">
          {success ? (
            <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="text-center text-slate-700 font-medium">{success}</p>
              <Link href="/login" className="mt-4 w-full">
                <Button variant="outline" className="w-full h-12 rounded-2xl">
                  Voltar para o Login
                </Button>
              </Link>
            </div>
          ) : (
            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">E-mail cadastrado</Label>
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

              {error && (
                <p className="text-sm text-red-500 text-center font-medium bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}
              
              <Button 
                type="submit" 
                disabled={isPending}
                className="w-full h-14 mt-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-70"
              >
                {isPending ? (
                  <>Enviando... <Loader2 className="h-5 w-5 animate-spin" /></>
                ) : (
                  'Enviar link de recuperação'
                )}
              </Button>

              <div className="mt-6 text-center">
                <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para o login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}