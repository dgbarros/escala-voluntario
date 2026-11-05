"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Loader2, Save } from "lucide-react";
import { toast } from "sonner"

// O componente precisa receber os dados atuais para preencher o formulário
interface ModalEditarProps {
  id: string;
  nomeAtual: string;
  cnpjAtual: string | null;
}

export default function ModalEditarIgreja({
  id,
  nomeAtual,
  cnpjAtual,
}: ModalEditarProps) {
  // 1. Estados do formulário. Já começam com os valores que vieram do banco.
  const [nome, setNome] = useState(nomeAtual);
  const [cnpj, setCnpj] = useState(cnpjAtual || "");

  // 2. Controle de carregamento e estado de abertura do modal
  const [isPending, setIsPending] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controla se o modal está visível

  const router = useRouter();

  // 3. Mesma máscara de CNPJ que você usou na criação
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    setCnpj(value.substring(0, 18));
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que o formulário recarregue a página inteira
    setIsPending(true);

    try {
      // 4. Limpamos a máscara antes de enviar (igual na criação)
      const cnpjLimpo = cnpj.replace(/\D/g, "");

      // 5. Disparamos o PATCH para a nossa API
      const response = await fetch(`/api/churches/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cnpj: cnpjLimpo,
        }),
      });

      if (response.ok) {
        setIsOpen(false); 
        router.refresh(); 
        toast.success("Dados da igreja atualizados com sucesso!")
      } else {
        const data = await response.json();
        toast.error(data.error || "Erro ao atualizar")
      }
    } catch (error) {
      alert("Falha ao comunicar com o servidor.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* O gatilho que faz o modal abrir (Fica visível na tela da Igreja) */}
      <DialogTrigger
        render={
          <Button variant="outline" className="bg-white">
            <Edit className="h-4 w-4 mr-2" />
            Editar Dados
          </Button>
        }
      />

      {/* O conteúdo que flutua por cima da tela */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Igreja</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias nos dados da instituição e salve.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSalvar} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Igreja</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              value={cnpj}
              onChange={handleCnpjChange}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)} // Botão de cancelar
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
