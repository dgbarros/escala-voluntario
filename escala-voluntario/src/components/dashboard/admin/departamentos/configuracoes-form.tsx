'use client'

import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, AlertTriangle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export function ConfiguracoesForm({ departamentoId, nomeAtual }: { departamentoId: string, nomeAtual: string }) {
  const [isPublic, setIsPublic] = useState(true)

  const salvarConfiguracoes = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Configurações salvas com sucesso! (Fase 3)")
  }

  const arquivarDepartamento = () => {
    if(confirm("Tem certeza? O departamento será arquivado e não aparecerá mais no sistema ativo.")) {
      alert("Departamento arquivado! (Fase 3)")
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={salvarConfiguracoes}>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50/50 border-b pb-6">
            <CardTitle className="text-xl">Geral</CardTitle>
            <CardDescription>Atualize os dados básicos do departamento.</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm font-semibold text-gray-900">
                Nome do Departamento
              </label>
              <input 
                id="nome"
                type="text" 
                defaultValue={nomeAtual}
                required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="descricao" className="text-sm font-semibold text-gray-900">
                Descrição
              </label>
              <textarea 
                id="descricao"
                rows={3}
                defaultValue="Equipe responsável por toda a parte musical da igreja." 
                className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none" 
              />
            </div>
            
            <hr className="border-gray-100" />

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-900">
                Recrutamento e Visibilidade
              </label>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50/50">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-900">Permitir novos voluntários</p>
                  <p className="text-xs text-muted-foreground">
                    Membros da igreja poderão ver este departamento e solicitar participação.
                  </p>
                </div>
                <Button 
                  type="button"
                  variant={isPublic ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setIsPublic(!isPublic)}
                  className={isPublic ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {isPublic ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
                  {isPublic ? "Aberto" : "Oculto"}
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50/50 border-t p-6 flex justify-end gap-3">
            <Link 
              href={`/admin/departamentos/${departamentoId}`}
              className={buttonVariants({ variant: "outline", className: "bg-white" })}
            >
              Cancelar
            </Link>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Card className="border-red-100 shadow-sm">
        <CardHeader className="bg-red-50/30 border-b border-red-100 pb-4">
          <CardTitle className="text-lg text-red-600">Zona de Perigo</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Arquivar este departamento</p>
            <p className="text-sm text-muted-foreground">
              O departamento será ocultado do sistema, mas as escalas antigas serão mantidas no histórico.
            </p>
          </div>
          <Button variant="destructive" onClick={arquivarDepartamento}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Arquivar Departamento
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}