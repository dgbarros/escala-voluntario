'use client'

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function CompletarCadastroForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const [nome, setNome] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erro, setErro] = useState("")

  const handleFinalizar = (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.")
      return
    }

    // startTransition(async () => {
    //   const resultado = await finalizarCadastroSetup({ nome, senha })

    //   if (resultado.sucesso) {
    //     // Redirecionamos para o /login, onde a "Catraca" (middleware)
    //     // vai ler o cargo dele e jogá-lo automaticamente pro painel de Admin
    //     router.push("/login")
    //   } else {
    //     setErro(resultado.erro || "Ocorreu um erro inesperado.")
    //   }
    // })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-none shadow-xl shadow-gray-200/50">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 size={24} />
          </div>
          <CardTitle className="text-2xl font-bold">Quase lá!</CardTitle>
          <CardDescription>
            Para acessar seu painel, informe seu nome e crie uma senha segura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFinalizar} className="space-y-4">
            {erro && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
                {erro}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input 
                id="nome" 
                placeholder="Como você quer ser chamado?" 
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Criar Senha</Label>
              <Input 
                id="senha" 
                type="password" 
                placeholder="Mínimo de 6 caracteres" 
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input 
                id="confirmarSenha" 
                type="password" 
                placeholder="Repita a senha" 
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
              disabled={isPending}
            >
              {isPending ? "Configurando conta..." : "Salvar e Acessar o Sistema"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}