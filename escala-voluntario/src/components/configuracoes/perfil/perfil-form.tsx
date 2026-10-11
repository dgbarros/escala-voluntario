"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

interface PerfilFormProps {
  usuario: {
    id: string;
    bio: string | null;
    profileImage: string | null;
  };
}

export default function PerfilForm({ usuario }: PerfilFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const [bio, setBio] = useState(usuario.bio || "");
  const [previewFoto, setPreviewFoto] = useState<string | null>(
    usuario.profileImage,
  );

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const urlProvisoria = URL.createObjectURL(file);
      setPreviewFoto(urlProvisoria);
    }
  };

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append("bio", bio);

      // 4. Injetamos o ID do usuário real que veio do Servidor
      formData.append("userId", usuario.id);

      const fileInput = document.getElementById("foto") as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append("foto", fileInput.files[0]);
      }

      const response = await fetch("/api/perfil", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao salvar perfil");

      alert("Perfil atualizado com sucesso!");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Falha ao atualizar o perfil.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Perfil Público</h2>
        <p className="text-slate-500 text-sm mt-1">
          Essas informações serão visíveis para os outros membros da sua igreja.
        </p>
      </div>

      <form onSubmit={handleSalvar} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
          <Avatar className="h-24 w-24 border-2 border-slate-100">
            <AvatarImage src={previewFoto || "/avatar-placeholder.png"} />
            <AvatarFallback className="text-2xl">EU</AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-center sm:text-left">
            <Label htmlFor="foto" className="cursor-pointer">
              <div className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors">
                <Camera className="h-4 w-4" />
                Escolher nova foto
              </div>
            </Label>
            <Input
              id="foto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFotoChange}
            />
            <p className="text-xs text-slate-400">
              Recomendado: JPG ou PNG quadrado. Máx 2MB.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="bio" className="text-slate-700 font-semibold">
            Sobre você (Biografia)
          </Label>
          <Textarea
            id="bio"
            placeholder="Ex: Sou baixista há 5 anos, trabalho com TI e estou disponível para as escalas de domingo de manhã..."
            className="resize-none h-32 rounded-xl border-slate-200"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <p className="text-xs text-slate-400">
            Escreva uma breve descrição sobre seus talentos ou disponibilidade.
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
