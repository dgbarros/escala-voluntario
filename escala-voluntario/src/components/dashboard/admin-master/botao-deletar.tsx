'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner" // Vamos usar no próximo passo!

export default function BotaoDeletarIgreja({ idIgreja }: { idIgreja: string }) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  // A função não precisa mais do window.confirm, pois o modal já faz essa trava
  const handleDelete = async () => {
    setIsPending(true)

    try {
      const response = await fetch(`/api/churches/${idIgreja}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success("Igreja excluída com sucesso!") // Mensagem bonita
        router.push('/admin-master') 
        router.refresh() 
      } else {
        const data = await response.json()
        toast.error(`Erro: ${data.error}`)
      }
    } catch (error) {
      toast.error("Falha ao comunicar com o servidor.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AlertDialog>
      {/* O Gatilho que abre o modal */}
      <AlertDialogTrigger
      render={
        <Button variant="destructive" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          Excluir Igreja
        </Button>
        }
        />
      
      
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a igreja
            e removerá todos os líderes, departamentos e dados associados a ela dos
            nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {/* O botão que de fato chama a nossa API */}
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
            Sim, excluir igreja
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}