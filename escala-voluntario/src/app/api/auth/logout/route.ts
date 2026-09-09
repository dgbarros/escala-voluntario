import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(){
    try{
        const supabase = await createClient()

        await supabase.auth.signOut() // Usando SDK nativo do SUPABASE

        return NextResponse.json({success: true}, {status: 200})
    }catch(error){
        console.error("Erro na API de logout:", error)
        return NextResponse.json({error: 'Erro ao encerrar sessão.' }, {status: 500})
    }
}