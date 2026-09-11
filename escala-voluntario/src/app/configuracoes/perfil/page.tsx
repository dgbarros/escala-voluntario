import { redirect } from "next/navigation";
import PerfilForm  from "@/components/configuracoes/perfil/perfil-form";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server"; // Importamos o SEU cliente Supabase

export default async function PerfilPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const usuarioBanco = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      bio: true,
      profileImage: true,
    }
  });

  if (!usuarioBanco) {
    return <div>Usuário não encontrado no banco de dados.</div>;
  }

  return (
    <div className="w-full">
      <PerfilForm usuario={usuarioBanco} />
    </div>
  );
}