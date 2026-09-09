import { Header } from "@/components/global/header";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const nomesCargos: Record<string, string> = {
  super_admin_global: "Super Admin Global",
  admin: "Administrador",
  leader: "Líder",
  volunteer: "Voluntário"
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  
  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  const userDb = await prisma.user.findUnique({
    where: { id: authUser.id }
  });

  const userRoleDb = await prisma.userRole.findFirst({
    where: { userId: authUser.id },
    include: { role: true }
  });

  const roleNoBanco = userRoleDb?.role?.name || "volunteer";
  const nomeCompleto = userDb?.name || "Usuário";

  const iniciais = nomeCompleto
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const dadosDoUsuario = {
    nome: nomeCompleto,
    email: authUser.email || "",
    cargoDisplay: nomesCargos[roleNoBanco] || "Voluntário",
    iniciais: iniciais
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header usuario={dadosDoUsuario} />
      
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}