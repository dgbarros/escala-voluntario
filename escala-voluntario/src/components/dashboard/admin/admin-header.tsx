'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { Shield, Link as LinkIcon, Plus } from "lucide-react"
import Link from "next/link"

export function AdminHeader({ nomeIgreja }: { nomeIgreja: string }) {
  const gerarLinkConvite = () => {
    alert("Link gerado e copiado! (https://escala.com/convite/sede-123)\nEste link expira em 24h.")
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Visão Geral da Igreja
        </h1>
        <p className="text-muted-foreground mt-1 flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-700">{nomeIgreja}</span>
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 w-full md:w-auto">
        <Button 
          variant="outline" 
          className="w-full md:w-auto bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
          onClick={gerarLinkConvite}
        >
          <LinkIcon className="mr-2 h-4 w-4" />
          Gerar Link de Convite
        </Button>
        
        <Link 
          href="/admin/novo-departamento"
          className={buttonVariants({ 
            className: "w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white" 
          })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Departamento
        </Link>
      </div>
    </div>
  )
}