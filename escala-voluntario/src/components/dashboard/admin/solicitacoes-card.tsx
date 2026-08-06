'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export interface Solicitacao {
  id: number
  nome: string
  email: string
  interesse: string
  data: string
}

export function SolicitacoesCard({ solicitacoes }: { solicitacoes: Solicitacao[] }) {
  // Funções temporárias (Fase 2)
  const aprovar = (nome: string) => alert(`${nome} foi aprovado!`)
  const recusar = (nome: string) => alert(`Solicitação de ${nome} recusada.`)

  return (
    <Card className="border-orange-200">
      <CardHeader className="bg-orange-50/50 pb-4 border-b border-orange-100">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Novas Solicitações</span>
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            {solicitacoes.length}
          </span>
        </CardTitle>
        <CardDescription>Voluntários aguardando aprovação</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {solicitacoes.map((solicitacao) => (
            <div key={solicitacao.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">{solicitacao.nome}</p>
                  <p className="text-xs text-muted-foreground">{solicitacao.email}</p>
                </div>
                <span className="text-[10px] text-gray-400">{solicitacao.data}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  Interesse: {solicitacao.interesse}
                </span>
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => recusar(solicitacao.nome)}
                  >
                    <X size={16} />
                  </Button>
                  <Button 
                    size="icon" 
                    className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => aprovar(solicitacao.nome)}
                  >
                    <Check size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}