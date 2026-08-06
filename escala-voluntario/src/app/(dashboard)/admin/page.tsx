import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Music, Video, Users } from "lucide-react"

import { AdminHeader } from "@/components/dashboard/admin/admin-header"
import { AdminMetrics } from "@/components/dashboard/admin/admin-metrics"
import { DepartamentosList, Departamento } from "@/components/dashboard/admin/departamentos-list"
import { SolicitacoesCard, Solicitacao } from "@/components/dashboard/admin/solicitacoes-card"

const igrejaMock = {
  nome: "Casa do Reino",
  totalVoluntarios: 124,
  totalDepartamentos: 5,
}

const solicitacoesMock: Solicitacao[] = [
  { id: 1, nome: "Lucas Mendes", email: "lucas.mendes@email.com", interesse: "Mídia/Transmissão", data: "Há 2 horas" },
  { id: 2, nome: "Sarah Silva", email: "sarah.s@email.com", interesse: "Louvor (Vocal)", data: "Há 5 horas" },
]

const departamentosMock: Departamento[] = [
  { id: 1, nome: "Ministério de Louvor", lider: "Marcos Paulo", voluntarios: 24, icone: <Music className="h-5 w-5 text-blue-500" /> },
  { id: 2, nome: "Comunicação e Mídia", lider: "Aguardando Líder", voluntarios: 8, icone: <Video className="h-5 w-5 text-purple-500" /> },
  { id: 3, nome: "Recepção", lider: "Tânia Mara", voluntarios: 15, icone: <Users className="h-5 w-5 text-green-500" /> },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 p-4 md:p-8">

  
      {/* 1. Cabeçalho */}
      <AdminHeader nomeIgreja={igrejaMock.nome} />

      {/* 2. Métricas Rápidas */}
      <AdminMetrics 
        voluntarios={igrejaMock.totalVoluntarios}
        departamentos={igrejaMock.totalDepartamentos}
        solicitacoes={solicitacoesMock.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* 3. Coluna Esquerda: Departamentos */}
        <DepartamentosList departamentos={departamentosMock} />

        {/* 4. Coluna Direita: Solicitações e Calendário */}
        <div className="space-y-6">
          
          <SolicitacoesCard solicitacoes={solicitacoesMock} />

          {/* Atalho para o Calendário (Pequeno demais para virar componente separado) */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-800 text-white border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Agenda de Cultos</h3>
                <p className="text-blue-100 text-sm mt-1">Gerencie as escalas da semana</p>
                <Button variant="secondary" size="sm" className="mt-4 bg-white text-blue-700 hover:bg-blue-50">
                  <Calendar className="mr-2 h-4 w-4" />
                  Abrir Calendário
                </Button>
              </div>
              <Calendar className="h-16 w-16 text-blue-400 opacity-50" />
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}