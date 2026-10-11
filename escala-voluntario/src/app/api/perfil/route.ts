import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const bio = formData.get("bio") as string;
    const userId = formData.get("userId") as string;
    const file = formData.get("foto") as File | null; 

    if (!userId) {
      return NextResponse.json(
        { error: "Usuário não identificado." },
        { status: 400 },
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    let fotoUrl = null;

    if (file && file.size > 0) {
      const nomeDoArquivo = `${userId}-${Date.now()}-${file.name}`;

      const { data: uploadData, error: uploadError } =
        await supabaseAdmin.storage.from("avatars").upload(nomeDoArquivo, file);

      if (uploadError) {
        throw new Error(`Erro ao subir a imagem: ${uploadError.message}`);
      }

      const { data: linkData } = supabaseAdmin.storage
        .from("avatars")
        .getPublicUrl(nomeDoArquivo);
      fotoUrl = linkData.publicUrl;
    }

    const dadosParaAtualizar: any = { bio: bio };

    if (fotoUrl) {
      dadosParaAtualizar.profileImage = fotoUrl;
    }

    const usuarioAtualizado = await prisma.user.update({
      where: { id: userId },
      data: dadosParaAtualizar,
    });

    revalidatePath("/configuracoes/perfil");

    revalidatePath("/", "layout");

    return NextResponse.json(
      { success: true, usuario: usuarioAtualizado },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Erro na API de Perfil:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno." },
      { status: 500 },
    );
  }
}
