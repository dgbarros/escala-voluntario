import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Importando o nosso novo componente de formulário
import { NovoDepartamentoForm, Lider } from "@/components/dashboard/admin/novo-departamento-form"

// MOCK: Na Fase 3, o Next.js vai buscar isso no Prisma (banco de dados) super rápido!
const lideresMock: Lider[] = [
  { id: 1, nome: "Marcos Paulo" },
  { id: 2, nome: "Tânia Mara" },
  { id: 3, nome: "Lucas Mendes" },
]

export default function NovoDepartamentoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 p-4 md:p-8">
      
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Visão Geral
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Criar Novo Departamento
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure um novo ministério ou equipe para sua igreja.
          </p>
        </div>
      </div>

      {/* RENDERIZANDO O COMPONENTE DE FORMULÁRIO */}
      <NovoDepartamentoForm lideres={lideresMock} />

    </div>
  )
}