import Link from "next/link";
import { User, Shield, ArrowLeft } from "lucide-react";

export default function ConfiguracoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto w-full p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <Link
          href="/" // Ajuste para a rota principal do seu painel (ex: /admin ou /)
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Painel
        </Link>
      </div>

      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Configurações
        </h1>
        <p className="text-slate-500 mt-2">
          Gerencie as informações da sua conta e segurança.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Menu Lateral (Sidebar) */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col gap-2">
            <Link
              href="/configuracoes/perfil"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors font-medium"
            >
              <User className="h-5 w-5" />
              Perfil Público
            </Link>

            <Link
              href="/configuracoes/seguranca"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors font-medium"
            >
              <Shield className="h-5 w-5" />
              Segurança e Senha
            </Link>
          </nav>
        </aside>

        {/* Área de Conteúdo (O buraco dinâmico) */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
