'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, User, ChevronDown, ChevronUp, Users, Palette, Music, Info, CheckCircle2 } from "lucide-react"

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

const USUARIO_LOGADO = "Douglas"

const mockInicial: DiaEscala[] = [
  {
    idData: "2026-08-09",
    dataExibicao: "09 de Agosto",
    diaSemana: "Domingo",
    observacoes: {
      paletaCores: "Preto, Branco e tons de Cinza",
      repertorio: "1. Abertura: Tu És Bom\n2. Celebração: Me Atraiu",
      avisos: "ATENÇÃO: Chegar às 17:30 para passagem de som."
    },
    cultos: [
      { id: 1, nome: "Culto de Celebração", horario: "18:00", escalados: ["Sarah Silva"] },
    ]
  }
]

export function PainelEscalaVoluntario() {
  const [escalasAgrupadas, setEscalasAgrupadas] = useState<DiaEscala[]>(mockInicial)
  const [diaAberto, setDiaAberto] = useState<string | null>("2026-08-09")

  const toggleDia = (idData: string) => setDiaAberto(diaAberto === idData ? null : idData)

  const toggleDisponibilidade = (idData: string, cultoId: number) => {
    setEscalasAgrupadas(estadoAtual => {
      return estadoAtual.map(dia => {
        if (dia.idData !== idData) return dia
        return {
          ...dia,
          cultos: dia.cultos.map(culto => {
            if (culto.id !== cultoId) return culto
            const jaEstaEscalado = culto.escalados.includes(USUARIO_LOGADO)
            return {
              ...culto,
              escalados: jaEstaEscalado 
                ? culto.escalados.filter(nome => nome !== USUARIO_LOGADO)
                : [...culto.escalados, USUARIO_LOGADO]
            }
          })
        }
      })
    })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
          Ministério de Louvor
        </h1>
        <p className="text-muted-foreground mt-1">
          Líder atual: <span className="font-medium text-gray-900">Marcos Paulo</span>
        </p>
      </div>

      <Card className="border-blue-100 shadow-sm overflow-hidden">
        <CardHeader className="border-b bg-blue-50/50 pb-5 pt-5">
          <CardTitle className="text-xl flex items-center gap-2 text-blue-800">
            <CalendarDays className="h-6 w-6" />
            Agenda do Mês
          </CardTitle>
          <CardDescription className="mt-1">
            Confirme sua disponibilidade nos próximos cultos.
          </CardDescription>
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
                      
                      {dia.observacoes && (
                        <div className="bg-white rounded-xl border border-blue-100 p-4 shadow-sm relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-blue-400"></div>
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <Info className="h-4 w-4 text-blue-600" /> Diretrizes do Dia
                          </h4>
                          
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
                        </div>
                      )}

                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 px-1">Selecione os cultos</h4>
                        {dia.cultos.map((culto) => {
                          const isConfirmado = culto.escalados.includes(USUARIO_LOGADO)
                          return (
                            <div key={culto.id} className={`bg-white rounded-xl border p-4 shadow-sm transition-all ${isConfirmado ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-gray-200'}`}>
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-base">{culto.nome}</h4>
                                  <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mt-1">
                                    <Clock className="h-4 w-4" /> {culto.horario}
                                  </div>
                                </div>
                                
                                <Button 
                                  onClick={() => toggleDisponibilidade(dia.idData, culto.id)}
                                  variant={isConfirmado ? "default" : "outline"}
                                  className={`w-full md:w-auto h-11 md:h-10 text-sm font-bold transition-all ${
                                    isConfirmado 
                                      ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
                                  }`}
                                >
                                  {isConfirmado ? (
                                    <><CheckCircle2 className="mr-2 h-4 w-4" /> Confirmado</>
                                  ) : (
                                    "Estou Disponível"
                                  )}
                                </Button>
                              </div>
                              
                              <div className="space-y-3">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                  <Users className="h-3 w-3" /> Equipe do Culto
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {culto.escalados.length > 0 ? (
                                    culto.escalados.map((pessoa, index) => (
                                      <span key={`${culto.id}-${index}`} className={`inline-flex items-center gap-1.5 border text-sm px-3 py-1.5 rounded-lg ${
                                        pessoa === USUARIO_LOGADO 
                                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-medium' 
                                          : 'bg-gray-100 border-gray-200 text-gray-800'
                                      }`}>
                                        <User className={`h-3.5 w-3.5 ${pessoa === USUARIO_LOGADO ? 'text-emerald-500' : 'text-blue-500'}`} /> 
                                        {pessoa === USUARIO_LOGADO ? 'Você' : pessoa}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-sm text-muted-foreground italic">Ninguém confirmado ainda.</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                    </div>
                  )}
                  
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}