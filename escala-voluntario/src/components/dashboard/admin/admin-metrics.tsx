import { Card, CardContent } from "@/components/ui/card"
import { Users, Shield } from "lucide-react"

interface MetricsProps {
  voluntarios: number
  departamentos: number
  solicitacoes: number
}

export function AdminMetrics({ voluntarios, departamentos, solicitacoes }: MetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total de Voluntários</p>
            <h3 className="text-3xl font-bold mt-2">{voluntarios}</h3>
          </div>
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Departamentos Ativos</p>
            <h3 className="text-3xl font-bold mt-2">{departamentos}</h3>
          </div>
          <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <Shield size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50/30">
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-orange-800">Solicitações Pendentes</p>
            <h3 className="text-3xl font-bold mt-2 text-orange-600">{solicitacoes}</h3>
          </div>
          <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
            <Users size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}