'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { CalendarDays, Clock, Plus, User, ChevronDown, ChevronUp, Users, Palette, Music, Info, Save, Edit } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"

// Tipagens
export interface Culto {
  id: number
  nome: string
  horario: string
  escalados: string[]
}

export interface ObservacoesDia {
  paletaCores: string
  repertorio: string
  avisos: string
}

export interface DiaEscala {
  idData: string
  dataExibicao: string
  diaSemana: string
  cultos: Culto[]
  observacoes?: ObservacoesDia
}

// MOCK INICIAL: Agora com as diretrizes completas preenchidas no Domingo!
const mockInicial: DiaEscala[] = [
  {
    idData: "2026-08-09",
    dataExibicao: "09 de Agosto",
    diaSemana: "Domingo",
    observacoes: {
      paletaCores: "Preto, Branco e tons de Cinza",
      repertorio: "1. Abertura: Tu És Bom\n2. Celebração: Me Atraiu\n3. Adoração: Lindo És\n4. Apelo: Caminho no Deserto",
      avisos: "ATENÇÃO: Chegar às 17:30 para passagem de som. Bateristas, não esqueçam de trazer as próprias baquetas."
    },
    cultos: [
      { id: 1, nome: "Culto de Celebração", horario: "18:00", escalados: ["Lucas Mendes", "Sarah Silva"] },
      { id: 2, nome: "Culto da Família", horario: "20:00", escalados: ["João Pedro", "Marcos Paulo"] },
    ]
  },
  {
    idData: "2026-08-11",
    dataExibicao: "11 de Agosto",
    diaSemana: "Terça-feira",
    cultos: [
      { id: 3, nome: "Culto de Ensino", horario: "20:00", escalados: ["Lucas Mendes"] },
    ]
  }
]

export function EscalaDepartamento() {
  const [escalasAgrupadas, setEscalasAgrupadas] = useState<DiaEscala[]>(mockInicial)
  const [diaAberto, setDiaAberto] = useState<string | null>("2026-08-09")
  const [editingObsId, setEditingObsId] = useState<string | null>(null)
  const [isNovaEscalaOpen, setIsNovaEscalaOpen] = useState(false)

  const toggleDia = (idData: string) => setDiaAberto(diaAberto === idData ? null : idData)

  const salvarNovaEscala = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const nome = formData.get("nome") as string
    const data = formData.get("data") as string
    const horario = formData.get("horario") as string
    
    if (!nome || !data || !horario) return alert("Preencha todos os campos!")

    const dataObj = new Date(data + "T00:00:00")
    const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const dataExibicao = `${String(dataObj.getDate()).padStart(2, '0')} de ${meses[dataObj.getMonth()]}`
    const diaSemana = dias[dataObj.getDay()]

    // Geramos um ID único baseado no tempo para evitar erros de colisão no map do React
    const novoCulto: Culto = {
      id: Date.now(),
      nome,
      horario,
      escalados: []
    }

    setEscalasAgrupadas((estadoAtual) => {
      const diaExistenteIndex = estadoAtual.findIndex(dia => dia.idData === data)

      if (diaExistenteIndex >= 0) {
        // CORREÇÃO DO STRICT MODE: Criamos um clone profundo para evitar duplicação em desenvolvimento
        const novoEstado = [...estadoAtual]
        const cultosAtualizados = [...novoEstado[diaExistenteIndex].cultos, novoCulto]
        
        novoEstado[diaExistenteIndex] = {
          ...novoEstado[diaExistenteIndex],
          cultos: cultosAtualizados.sort((a, b) => a.horario.localeCompare(b.horario))
        }
        return novoEstado
      } else {
        const novoDia: DiaEscala = {
          idData: data,
          dataExibicao,
          diaSemana,
          cultos: [novoCulto]
        }
        return [...estadoAtual, novoDia].sort((a, b) => a.idData.localeCompare(b.idData))
      }
    })

    setIsNovaEscalaOpen(false)
    setDiaAberto(data)
  }
  
  const salvarObservacoes = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Observações salvas! (Fase 3)")
    setEditingObsId(null)
  }

  return (
    <Card className="border-blue-100 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-blue-50/50 pb-5 pt-5">
        <div>
          <CardTitle className="text-xl flex items-center gap-2 text-blue-800">
            <CalendarDays className="h-6 w-6" />
            Agenda e Escalas
          </CardTitle>
          <CardDescription className="mt-1">
            Gerencie os cultos, voluntários e repertórios de cada dia.
          </CardDescription>
        </div>
        
        <Dialog open={isNovaEscalaOpen} onOpenChange={setIsNovaEscalaOpen}>
          <DialogTrigger className={buttonVariants({ size: "default", className: "bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto cursor-pointer" })}>
            <Plus className="mr-2 h-4 w-4" />
            Inserir Escala
          </DialogTrigger>
          <DialogContent className="max-w-md w-[95vw] rounded-xl">
            <DialogHeader>
              <DialogTitle>Nova Escala de Culto</DialogTitle>
              <DialogDescription>Crie a base do culto para depois adicionar voluntários.</DialogDescription>
            </DialogHeader>
            <form onSubmit={salvarNovaEscala}>
              <div className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Nome do Culto / Evento</label>
                  <input name="nome" type="text" required placeholder="Ex: Culto da Família" className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Data</label>
                    <input name="data" type="date" required className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Horário</label>
                    <input name="horario" type="time" required className="flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none" />
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full h-11 text-base">
                  Salvar Escala
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          
          {escalasAgrupadas.map((dia) => {
            const isAberto = diaAberto === dia.idData
            const totalCultos = dia.cultos.length
            
            return (
              <div key={dia.idData} className="flex flex-col">
                <button onClick={() => toggleDia(dia.idData)} className={`flex items-center justify-between p-4 md:p-5 w-full text-left transition-colors ${isAberto ? 'bg-blue-50/30' : 'hover:bg-gray-50 bg-white'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border ${isAberto ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>
                      <span className="text-xs font-semibold uppercase">{dia.diaSemana.slice(0, 3)}</span>
                      <span className="text-xl font-bold leading-none">{dia.dataExibicao.split(' ')[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{dia.diaSemana}</h3>
                      <p className="text-sm text-muted-foreground">{dia.dataExibicao}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline-flex items-center text-xs font-medium bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                      {totalCultos} {totalCultos === 1 ? 'culto' : 'cultos'}
                    </span>
                    {isAberto ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                  </div>
                </button>

                {isAberto && (
                  <div className="p-4 md:p-5 bg-gray-50/50 border-t border-blue-50 space-y-6 animate-in slide-in-from-top-2 duration-200">
                    
                    <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                      
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-600" /> Diretrizes do Dia
                        </h4>
                        
                        <Dialog open={editingObsId === dia.idData} onOpenChange={(open) => setEditingObsId(open ? dia.idData : null)}>
                          <DialogTrigger className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8 text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer" })}>
                            <Edit className="h-3.5 w-3.5 mr-1.5" /> Editar
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Editar Diretrizes do Dia</DialogTitle>
                              <DialogDescription>Atualize paleta, repertório e avisos para {dia.dataExibicao}.</DialogDescription>
                            </DialogHeader>
                            <form id={`form-obs-${dia.idData}`} onSubmit={salvarObservacoes} className="space-y-4 py-2">
                              <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Palette className="h-4 w-4 text-pink-500" /> Paleta de Cores</label>
                                <input type="text" defaultValue={dia.observacoes?.paletaCores} className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-900 flex items-center gap-2"><Music className="h-4 w-4 text-blue-500" /> Repertório / Cronograma</label>
                                <textarea rows={4} defaultValue={dia.observacoes?.repertorio} className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 outline-none resize-none" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-gray-900">Avisos Especiais</label>
                                <textarea rows={2} defaultValue={dia.observacoes?.avisos} className="flex w-full rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none" />
                              </div>
                            </form>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingObsId(null)} type="button">Cancelar</Button>
                              <Button type="submit" form={`form-obs-${dia.idData}`} className="bg-blue-600 hover:bg-blue-700">Salvar Alterações</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {dia.observacoes ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5 mb-1"><Palette className="h-3 w-3 text-pink-500" /> Paleta</span>
                              <p className="text-sm text-gray-800">{dia.observacoes.paletaCores}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5 mb-1"><Info className="h-3 w-3 text-orange-500" /> Avisos</span>
                              <p className="text-sm text-orange-800 bg-orange-50 p-2 rounded border border-orange-100">{dia.observacoes.avisos}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5 mb-1"><Music className="h-3 w-3 text-blue-500" /> Repertório</span>
                            <div className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 p-2 rounded border border-gray-100 h-full">{dia.observacoes.repertorio}</div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Nenhuma diretriz cadastrada para este dia.</p>
                      )}
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-gray-900 px-1">Cultos e Voluntários</h4>
                      {dia.cultos.map((culto) => (
                        <div key={culto.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 text-base">{culto.nome}</h4>
                              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mt-1">
                                <Clock className="h-4 w-4" /> {culto.horario}
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="w-full md:w-auto h-9">Editar Culto</Button>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                              <Users className="h-3 w-3" /> Voluntários Escalados
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {culto.escalados.map((pessoa, index) => (
                                <span key={`${culto.id}-${index}`} className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded-lg">
                                  <User className="h-3.5 w-3.5 text-blue-500" /> {pessoa}
                                </span>
                              ))}
                              <button className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 border-dashed text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
                                <Plus className="h-3.5 w-3.5" /> Adicionar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
                
              </div>
            )
          })}
          
        </div>
      </CardContent>
    </Card>
  )
}