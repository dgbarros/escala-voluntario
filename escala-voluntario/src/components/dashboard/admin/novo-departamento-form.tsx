'use client'

import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, Video, Users, Heart, Camera, Shield, HandHeart, Mic } from "lucide-react"
import Link from "next/link"

// Tipagem para os líderes que virão do banco de dados na Fase 3
export interface Lider {
  id: number
  nome: string
}

// Opções de ícones (Isto é puramente visual, então fica no componente client)
const iconesDisponiveis = [
  { id: 'music', icone: <Music className="h-6 w-6" />, cor: "text-blue-500", bg: "bg-blue-100", border: "border-blue-500" },
  { id: 'video', icone: <Video className="h-6 w-6" />, cor: "text-purple-500", bg: "bg-purple-100", border: "border-purple-500" },
  { id: 'users', icone: <Users className="h-6 w-6" />, cor: "text-green-500", bg: "bg-green-100", border: "border-green-500" },
  { id: 'heart', icone: <Heart className="h-6 w-6" />, cor: "text-red-500", bg: "bg-red-100", border: "border-red-500" },
  { id: 'camera', icone: <Camera className="h-6 w-6" />, cor: "text-yellow-500", bg: "bg-yellow-100", border: "border-yellow-500" },
  { id: 'shield', icone: <Shield className="h-6 w-6" />, cor: "text-slate-500", bg: "bg-slate-100", border: "border-slate-500" },
  { id: 'hand', icone: <HandHeart className="h-6 w-6" />, cor: "text-teal-500", bg: "bg-teal-100", border: "border-teal-500" },
  { id: 'mic', icone: <Mic className="h-6 w-6" />, cor: "text-orange-500", bg: "bg-orange-100", border: "border-orange-500" },
]

export function NovoDepartamentoForm({ lideres }: { lideres: Lider[] }) {
  const [iconeSelecionado, setIconeSelecionado] = useState<string>('users')

  const salvarDepartamento = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Departamento criado com sucesso! (Fase 3: Isso irá para o banco de dados)")
  }

  return (
    <form onSubmit={salvarDepartamento}>
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b pb-6">
          <CardTitle className="text-xl">Informações Básicas</CardTitle>
          <CardDescription>Estes dados ajudarão a identificar o departamento no sistema.</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          
          <div className="space-y-2">
            <label htmlFor="nome" className="text-sm font-semibold text-gray-900">
              Nome do Departamento <span className="text-red-500">*</span>
            </label>
            <input 
              id="nome"
              type="text" 
              required
              placeholder="Ex: Ministério de Louvor, Recepção, Mídia..." 
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="descricao" className="text-sm font-semibold text-gray-900">
              Descrição Breve
            </label>
            <textarea 
              id="descricao"
              rows={3}
              placeholder="Qual o propósito principal desta equipe?" 
              className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-900">
              Escolha um Ícone e Cor <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {iconesDisponiveis.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIconeSelecionado(item.id)}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all ${
                    iconeSelecionado === item.id 
                      ? `${item.border} ${item.bg} ${item.cor} shadow-sm scale-105` 
                      : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:border-gray-200'
                  }`}
                >
                  {item.icone}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-2">
            <label htmlFor="lider" className="text-sm font-semibold text-gray-900">
              Atribuir Líder (Opcional)
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              Você pode definir quem vai gerenciar as escalas deste departamento agora ou escolher depois.
            </p>
            <select 
              id="lider"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Deixar sem líder por enquanto</option>
              {lideres.map(lider => (
                <option key={lider.id} value={lider.id}>{lider.nome}</option>
              ))}
            </select>
          </div>

        </CardContent>
        
        <CardFooter className="bg-gray-50/50 border-t p-6 flex justify-end gap-3">
          <Link 
            href="/admin"
            className={buttonVariants({ variant: "outline", className: "bg-white" })}
          >
            Cancelar
          </Link>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Criar Departamento
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}