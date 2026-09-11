'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Loader2, Save, ShieldAlert } from "lucide-react"

export default function SegurancaForm() {
  const [isPending, setIsPending] = useState(false)
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [erro, setErro] = useState<string | null>(null)

  const handleSalvarSenha = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)

    // Validação de segurança no Front-end
    if (senha.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem. Digite novamente.")
      return
    }

    setIsPending(true)
    
    // Aqui vai entrar a nossa chamada para a API de trocar senha no futuro!
    
    setTimeout(() => {
      setIsPending(false)
      setSenha("")
      setConfirmarSenha("")
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      
      {/* Bloco de Alterar Senha */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Lock className="h-6 w-6 text-blue-600" />
            Alterar Senha
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Crie uma nova senha forte para proteger sua conta.
          </p>
        </div>

        <form onSubmit={handleSalvarSenha} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="senha">Nova Senha</Label>
            <Input 
              id="senha" 
              type="password" 
              placeholder="••••••••" 
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
            <Input 
              id="confirmarSenha" 
              type="password" 
              placeholder="••••••••" 
              required
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
            />
          </div>

          {erro && (
            <p className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
              {erro}
            </p>
          )}

          <div className="pt-2">
            <Button 
              type="submit" 
              disabled={isPending || !senha || !confirmarSenha}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Atualizar Senha
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Bloco de Excluir Conta (Zona de Perigo) */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 md:p-8">
        <h3 className="text-lg font-bold text-red-700 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5" />
          Zona de Perigo
        </h3>
        <p className="text-red-600 text-sm mt-1 mb-4">
          A exclusão da conta é permanente e apagará todos os seus dados das escalas.
        </p>
        <Button variant="destructive" className="rounded-xl">
          Excluir minha conta
        </Button>
      </div>

    </div>
  )
}