'use client'

import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Palette, Music, Save } from "lucide-react"

// Importando os componentes do Modal (Dialog)
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

export interface Observacoes {
  paletaCores: string
  repertorio: string
  avisos: string
}

export function ObservacoesPainel({ observacoes }: { observacoes: Observacoes }) {
  // Controle de abertura/fechamento do modal
  const [isOpen, setIsOpen] = useState(false)

  // Função para simular o salvamento na Fase 3
  const salvarObservacoes = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Observações atualizadas com sucesso! (Fase 3: Isso irá para o banco de dados via Prisma)")
    setIsOpen(false) // Fecha o modal após salvar
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 bg-blue-50/30">
        <CardHeader className="pb-3 border-b border-blue-100">
          <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
            <Info className="h-5 w-5" />
            Quadro de Observações
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Palette className="h-4 w-4 text-pink-500" />
              Paleta de Cores (Próx. Culto)
            </h4>
            <p className="text-sm text-gray-700 bg-white p-3 rounded-md border shadow-sm">
              {observacoes.paletaCores}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
              <Music className="h-4 w-4 text-blue-500" />
              Repertório / Cronograma
            </h4>
            <div className="text-sm text-gray-700 bg-white p-3 rounded-md border shadow-sm whitespace-pre-wrap">
              {observacoes.repertorio}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Avisos da Liderança</h4>
            <p className="text-sm text-orange-800 bg-orange-100/50 p-3 rounded-md border border-orange-200">
              {observacoes.avisos}
            </p>
          </div>

          {/* O BOTÃO AGORA É UM TRIGGER PARA O DIALOG */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className={buttonVariants({ variant: "outline", className: "w-full bg-white cursor-pointer" })}>
              Editar Observações
            </DialogTrigger>
            
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Editar Observações</DialogTitle>
                <DialogDescription>
                  Atualize as diretrizes semanais para a equipe deste departamento.
                </DialogDescription>
              </DialogHeader>

              {/* Formulário de Edição */}
              <form id="form-observacoes" onSubmit={salvarObservacoes} className="space-y-4 py-4">
                
                <div className="space-y-2">
                  <label htmlFor="paleta" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Palette className="h-4 w-4 text-pink-500" />
                    Paleta de Cores
                  </label>
                  <input 
                    id="paleta"
                    type="text" 
                    defaultValue={observacoes.paletaCores}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="repertorio" className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Music className="h-4 w-4 text-blue-500" />
                    Repertório / Cronograma
                  </label>
                  <textarea 
                    id="repertorio"
                    rows={4}
                    defaultValue={observacoes.repertorio}
                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="avisos" className="text-sm font-semibold text-gray-900">
                    Avisos da Liderança
                  </label>
                  <textarea 
                    id="avisos"
                    rows={3}
                    defaultValue={observacoes.avisos}
                    className="flex w-full rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" 
                  />
                </div>

              </form>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)} type="button">
                  Cancelar
                </Button>
                <Button type="submit" form="form-observacoes" className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </CardContent>
      </Card>
    </div>
  )
}