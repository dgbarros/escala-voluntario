import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  nome: string;
  lider: string;
}

export function DepartamentoHeader({ nome, lider, departamentoId }: { nome: string, lider: string, departamentoId: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/admin"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors w-fit"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para Visão Geral
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex items-center gap-3">
            {nome}
          </h1>
          <p className="text-muted-foreground mt-1">
            Líder atual:{" "}
            <span className="font-medium text-gray-900">{lider}</span>
          </p>
        </div>
        <Link
          href={`/admin/departamentos/${departamentoId}/configuracoes`}
          className={buttonVariants({
            variant: "outline",
            className: "bg-white",
          })}
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurações do Depto
        </Link>
      </div>
    </div>
  );
}
