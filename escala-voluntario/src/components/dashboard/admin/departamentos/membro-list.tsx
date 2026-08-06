'use client'

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users, Plus, UserMinus, MoreVertical, ShieldAlert } from "lucide-react"

// Importando os componentes do Dialog (Modal)
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from "@/components/ui/dialog"

// Importando os componentes do DropdownMenu (incluindo o DropdownMenuGroup)
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu"

export interface Membro {
  id: number
  nome: string
  funcao: string
}

// MOCK: Simulando voluntários da igreja que ainda não estão neste departamento
const voluntariosDisponiveisMock = [
  { id: 10, nome: "Ana Costa", ministerio: "Recepção" },
  { id: 11, nome: "Carlos Eduardo", ministerio: "Nenhum" },
]

export function MembroList({ membros }: { membros: Membro[] }) {
  
  // Funções simuladas para a Fase 2
  const promoverLider = (nome: string) => alert(`${nome} foi promovido a Líder do Departamento! (Fase 3)`)
  const removerMembro = (nome: string) => alert(`${nome} removido do departamento. (Fase 3)`)
  const adicionarMembro = (nome: string) => alert(`${nome} adicionado ao departamento! (Fase 3)`)

  return (
    <div className="lg:col-span-2 space-y-6">
      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50 pb-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Membros do Departamento
            </CardTitle>
            <CardDescription>Gerencie quem faz parte desta equipe</CardDescription>
          </div>
          
          {/* DIALOG DE ADICIONAR MEMBRO (Corrigido o Trigger) */}
          <Dialog>
            <DialogTrigger 
              className={buttonVariants({ size: "sm", className: "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer" })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Voluntário</DialogTitle>
                <DialogDescription>
                  Selecione um voluntário da igreja para integrar este departamento.
                </DialogDescription>
              </DialogHeader>
              
              {/* Lista de disponíveis */}
              <div className="space-y-2 mt-4">
                {voluntariosDisponiveisMock.map(vol => (
                  <div key={vol.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium text-sm">{vol.nome}</p>
                      <p className="text-xs text-muted-foreground">Atual: {vol.ministerio}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => adicionarMembro(vol.nome)}>
                      <Plus className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                ))}
              </div>
              <DialogFooter className="mt-4">
                <Button variant="ghost" className="w-full">Ver todos os voluntários...</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {membros.map((membro) => (
              <div key={membro.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                    {membro.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{membro.nome}</p>
                    <p className="text-xs text-muted-foreground">{membro.funcao}</p>
                  </div>
                </div>

                {/* DROPDOWN MENU (Os 3 pontinhos - Corrigido o Trigger e o Group) */}
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    className={buttonVariants({ variant: "ghost", size: "icon", className: "hover:bg-gray-200" })}
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Ações do Membro</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        className="cursor-pointer text-blue-600 focus:text-blue-700 focus:bg-blue-50"
                        onClick={() => promoverLider(membro.nome)}
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Promover a Líder
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                        onClick={() => removerMembro(membro.nome)}
                      >
                        <UserMinus className="mr-2 h-4 w-4" />
                        Remover do Depto
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                  </DropdownMenuContent>
                </DropdownMenu>
                
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}