import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export interface Departamento {
  id: number
  nome: string
  lider: string
  voluntarios: number
  icone: React.ReactNode
}

export function DepartamentosList({ departamentos }: { departamentos: Departamento[] }) {
  return (
    <div className="xl:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Departamentos</h2>
        <Link href="/admin/departamentos" className="text-sm text-blue-600 hover:underline">
          Ver todos
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {departamentos.map((dept) => (
          // ENVOLVEMOS O CARD COM O LINK AQUI:
          <Link href={`/admin/departamentos/${dept.id}`} key={dept.id} className="block">
            <Card className="hover:border-blue-300 transition-all hover:shadow-md cursor-pointer group h-full">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    {dept.icone}
                  </div>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {dept.voluntarios} vols
                  </span>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                  {dept.nome}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  Líder: <span className={dept.lider === "Aguardando Líder" ? "text-orange-500 font-medium" : "text-gray-700"}>
                    {dept.lider}
                  </span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}