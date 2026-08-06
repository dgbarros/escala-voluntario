import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ConfiguracoesForm } from "@/components/dashboard/admin/departamentos/configuracoes-form"

export default function ConfiguracoesDepartamentoPage({ params }: { params: { id: string } }) {
  // MOCK: Na Fase 3, vamos buscar o nome do departamento no Prisma usando o params.id
  const nomeDepartamentoMock = "Ministério de Louvor"

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 p-4 md:p-8">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col gap-4 border-b pb-6">
        <Link 
          href={`/admin/departamentos/${params.id}`} 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors w-fit"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para {nomeDepartamentoMock}
        </Link>
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Configurações do Departamento
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as preferências, acessos e detalhes da equipe.
          </p>
        </div>
      </div>

      {/* RENDERIZA O FORMULÁRIO */}
      <ConfiguracoesForm departamentoId={params.id} nomeAtual={nomeDepartamentoMock} />

    </div>
  )
}