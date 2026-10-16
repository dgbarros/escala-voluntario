'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShieldAlert } from 'lucide-react'

export default function AceitarConvite() {
  const searchParams = useSearchParams()
  const urlDoSupabase = searchParams.get('url')

  if (!urlDoSupabase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <ShieldAlert className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-bold text-slate-800">Link Inválido</h1>
        <p className="text-slate-600 mt-2">O link de convite está ausente ou malformado.</p>
      </div>
    )
  }

  const handleAceitar = () => {
    window.location.href = urlDoSupabase
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-md text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Convite Verificado!</h1>
        <p className="text-slate-600 mb-8">
          Para garantir sua segurança, por favor confirme que deseja acessar o painel e cadastrar sua senha.
        </p>
        
        <Button 
          onClick={handleAceitar} 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-lg"
        >
          Acessar Sistema
        </Button>
      </div>
    </div>
  )
}