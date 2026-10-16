import { Suspense } from "react"
import AceitarConvite from "@/components/aceitar-convite/aceitar-convite"

export default function AceitarConvitePage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        Carregando convite...
      </div>
    }>
      <AceitarConvite />
    </Suspense>
  )
}