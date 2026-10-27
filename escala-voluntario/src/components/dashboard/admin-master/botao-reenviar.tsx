'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'

interface BotaoReenviarProps {
  email: string;
  nomeIgreja: string;
}

export default function BotaoReenviar({ email, nomeIgreja }: BotaoReenviarProps) {
  const [isPending, setIsPending] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  const handleReenviar = async () => {
    setIsPending(true)
    try {
      const response = await fetch('/api/auth/reenviar-convite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nomeIgreja })
      })

      const data = await response.json() 

      if (response.ok) {
        setSucesso(true)
        setTimeout(() => setSucesso(false), 3000) 
      } else {
        console.error("Erro detalhado do servidor:", data)
        alert(`Erro ao reenviar: ${data.error || 'Erro desconhecido'}`)
      }
    } catch (error) {
      alert("Falha na comunicação com o servidor.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleReenviar}
      disabled={isPending || sucesso}
      className={sucesso ? "text-green-600 border-green-200 bg-green-50" : ""}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : sucesso ? (
        <CheckCircle2 className="h-4 w-4 mr-2" />
      ) : (
        <Mail className="h-4 w-4 mr-2" />
      )}
      {sucesso ? "Enviado!" : "Reenviar Convite"}
    </Button>
  )
}