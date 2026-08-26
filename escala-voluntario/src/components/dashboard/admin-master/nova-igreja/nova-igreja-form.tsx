"use client";

import { startTransition, useState, useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Building2, Send, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

import { criarIgrejaComAdmins } from "@/actions/church-actions";

export default function NovaIgrejaForm() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [isPending, startTransition] = useTransition();
  const [telefone, setTelefone] = useState("");

  const [admins, setAdmins] = useState([{ id: 1, email: "" }]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

    // Aplica a máscara: 00.000.000/0000-00
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");

    setCnpj(value.substring(0, 18));
    if (errors.cnpj) setErrors({ ...errors, cnpj: "" });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.substring(0, 11);

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (value.length > 9) {
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (value.length > 8) {
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }

    setTelefone(value);
    if (errors.telefone) setErrors({ ...errors, telefone: "" });
  };

  const adicionarAdmin = () => {
    setAdmins([...admins, { id: Date.now(), email: "" }]);
  };

  const removerAdmin = (id: number) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  const atualizarEmailAdmin = (id: number, novoEmail: string) => {
    setAdmins(
      admins.map((admin) =>
        admin.id === id ? { ...admin, email: novoEmail } : admin,
      ),
    );
    if (errors.admins) setErrors({ ...errors, admins: "" });
  };

  const handleSalvar = () => {
    const novosErros: { [key: string]: string } = {};

    if (!nome.trim()) novosErros.nome = "O nome da igreja é obrigatório.";

    if (!cnpj) {
      novosErros.cnpj = "O CNPJ é obrigatório.";
    } else if (cnpj.length < 18) {
      novosErros.cnpj = "Digite um CNPJ válido.";
    }

    if (!telefone) {
      novosErros.telefone = "O telefone é obrigatório.";
    } else if (telefone.length < 14) {
      novosErros.telefone = "Digite um telefone válido.";
    }

    const algumAdminVazio = admins.some((admin) => !admin.email.trim());
    if (algumAdminVazio) {
      novosErros.admins = "Preencha todos os e-mails dos administradores.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErrors(novosErros);
      return;
    }

    startTransition(async () => {
      try {
        const resultado = await criarIgrejaComAdmins({
          nome,
          cnpj,
          telefone,
          admins: admins.map((a) => a.email),
        });

        if (resultado.sucesso) {
          alert("Igreja e Administradores criados com sucesso!");
        } else {
          setErrors({ geral: resultado.erro || "Erro desconhecido" });
        }
      } catch (error) {
        setErrors({ geral: "Falha na comunicação com o servidor." });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 p-4">
      <Link
        href="/admin-master"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para gestão de igrejas
      </Link>

      <Card className="border-none shadow-xl shadow-gray-200/50">
        <CardHeader className="bg-gray-50/50 border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Building2 size={24} />
            </div>
            <div>
              <CardTitle className="text-2xl">Cadastrar Nova Igreja</CardTitle>
              <CardDescription>
                Configure os dados fiscais e defina os administradores locais.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <form className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900 border-b pb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-400" />
                Dados da Instituição
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label
                    htmlFor="nome"
                    className={errors.nome ? "text-red-500" : ""}
                  >
                    Nome da Igreja / Congregação
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Ex: Casa do Reino"
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (errors.nome) setErrors({ ...errors, nome: "" });
                    }}
                    className={
                      errors.nome
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.nome && (
                    <span className="text-xs text-red-500">{errors.nome}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="cnpj"
                    className={errors.cnpj ? "text-red-500" : ""}
                  >
                    CNPJ
                  </Label>
                  <Input
                    id="cnpj"
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={handleCnpjChange}
                    className={
                      errors.cnpj
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.cnpj && (
                    <span className="text-xs text-red-500">{errors.cnpj}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="telefone"
                    className={errors.telefone ? "text-red-500" : ""}
                  >
                    Telefone Principal
                  </Label>
                  <Input
                    id="telefone"
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChange={handleTelefoneChange}
                    className={
                      errors.telefone
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  />
                  {errors.telefone && (
                    <span className="text-xs text-red-500">
                      {errors.telefone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Administradores da Igreja
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Estas pessoas receberão um link para criar a conta e terão
                    controle total sobre os departamentos.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={adicionarAdmin}
                  className="bg-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Admin
                </Button>
              </div>

              <div className="space-y-3 pt-2">
                {admins.map((admin, index) => (
                  <div key={admin.id} className="flex items-end gap-3">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor={`email-${admin.id}`}>
                        E-mail do Administrador {index + 1}
                      </Label>
                      <Input
                        id={`email-${admin.id}`}
                        type="email"
                        placeholder="pastor@igreja.com"
                        className={`bg-white ${errors.admins ? "border-red-500" : ""}`}
                        value={admin.email}
                        onChange={(e) =>
                          atualizarEmailAdmin(admin.id, e.target.value)
                        }
                      />
                    </div>
                    {admins.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 mb-[2px]"
                        onClick={() => removerAdmin(admin.id)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                ))}
                {errors.admins && (
                  <span className="text-xs text-red-500">{errors.admins}</span>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-6 border-t">
              <Link
                href="/admin-master"
                className={buttonVariants({ variant: "ghost" })}
              >
                Cancelar
              </Link>
              <Button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                onClick={handleSalvar}
                disabled={isPending}
              >
                <Send className="mr-2 h-4 w-4" />
                {isPending ? "Processando..." : "Salvar e Enviar Link"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
