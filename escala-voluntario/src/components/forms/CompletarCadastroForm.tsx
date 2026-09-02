"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function CompletarCadastroForm() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [emailUsuario, setEmailUsuario] = useState("");
  
  const [tokenSeguro, setTokenSeguro] = useState("");

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarSessao = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        setTokenSeguro(session.access_token);
        setEmailUsuario(session.user?.email || "");
      } else {
        const hash = window.location.hash;
        if (hash && hash.includes("access_token=")) {
          const params = new URLSearchParams(hash.substring(1));
          const urlToken = params.get("access_token");
          
          if (urlToken) {
            setTokenSeguro(urlToken);
            const { data: { user } } = await supabase.auth.getUser(urlToken);
            if (user?.email) setEmailUsuario(user.email);
          }
        }
      }
      setIsLoadingSession(false);
    };

    carregarSessao();
  }, [supabase]);

  const handleFinalizar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (!tokenSeguro) {
      setErro("Não foi possível validar o seu convite. Por favor, clique no link do e-mail novamente.");
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch("/api/auth/complete-setup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenSeguro}`
        },
        body: JSON.stringify({ nome, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErro(data.error || "Ocorreu um erro ao configurar a conta.");
        setIsPending(false);
        return;
      }

      router.push("/login");

    } catch (err) {
      setErro("Falha de comunicação com o servidor.");
      setIsPending(false);
    }
  };

  if (isLoadingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-500 font-medium">Validando convite seguro...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-none shadow-xl shadow-gray-200/50">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 size={24} />
          </div>
          <CardTitle className="text-2xl font-bold">Quase lá!</CardTitle>
          <CardDescription>
            Configurando a conta para:<br/>
            <strong className="text-blue-600">{emailUsuario || "Carregando..."}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFinalizar} className="space-y-4">
            {erro && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
                {erro}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                placeholder="Como você quer ser chamado?"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Criar Senha</Label>
              <Input
                id="senha"
                type="password"
                placeholder="Mínimo de 6 caracteres"
                required
                minLength={6}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
              disabled={isPending}
            >
              {isPending ? "Configurando conta..." : "Salvar e Acessar o Sistema"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}