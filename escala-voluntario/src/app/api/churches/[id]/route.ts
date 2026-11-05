import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';

export async function DELETE(request: Request, {params}: {params: Promise<{id: string}>}){
    try{
        const {id} = await params;

        await prisma.church.delete({
            where: {id: id}
        });

        return NextResponse.json({success:true},{status: 200});
    }catch(error){
        console.error("Erro ao deletar:", error);
        return NextResponse.json({error: 'Erro interno ao deletar a igreja'},{status: 500})
    }
}

export async function PATCH(request: Request, {params}: {params: Promise<{id:string}>}){
    try{
        const {id} = await params;

        const body = await request.json();

        const cnpjLimpo = body.cnpj?.replace(/\D/g, "");
        const telefoneLimpo = body.telefone?.replace(/\D/g, "");

        const igrejaAtualizada = await prisma.church.update({
            where: {id: id},
            data:{
                name: body.nome,
                cnpj: cnpjLimpo,
                telefone: telefoneLimpo,
            }
        });

        return NextResponse.json(igrejaAtualizada, {status: 200})
    }catch (error: any) {
    console.error("Erro ao editar:", error);
    return NextResponse.json({ error: 'Erro interno ao atualizar a igreja.' }, { status: 500 });
  }

}