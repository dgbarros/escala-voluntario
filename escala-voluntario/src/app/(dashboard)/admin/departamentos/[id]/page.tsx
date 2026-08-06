import { DepartamentoHeader } from "@/components/dashboard/admin/departamentos/departamento-header"
import { MembroList, Membro } from "@/components/dashboard/admin/departamentos/membro-list"
import { EscalaDepartamento } from "@/components/dashboard/admin/departamentos/escala-departamento"

// --- MOCKS ---
const departamentoMock = {
  nome: "Ministério de Louvor",
  lider: "Marcos Paulo",
  membros: [
    { id: 1, nome: "Lucas Mendes", funcao: "Guitarra/Violão" },
    { id: 2, nome: "Sarah Silva", funcao: "Vocal Principal" },
    { id: 3, nome: "João Pedro", funcao: "Bateria" },
  ] as Membro[]
}

export default function DepartamentoDetalhesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 p-4 md:p-8">
      
      <DepartamentoHeader 
        nome={departamentoMock.nome}
        lider={departamentoMock.lider} 
        departamentoId={""}      
      />

      {/* Grid principal: A Escala fica em destaque, ocupando 2 colunas no desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA (Maior): Focada no Calendário/Escala e Diretrizes */}
        <div className="xl:col-span-2 space-y-6">
          <EscalaDepartamento/>
        </div>

        {/* COLUNA DIREITA: Focada na gestão de pessoas */}
        <div className="space-y-6">
          <MembroList membros={departamentoMock.membros} />
        </div>

      </div>
    </div>
  )
}