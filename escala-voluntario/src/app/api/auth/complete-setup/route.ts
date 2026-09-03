import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.split(' ')[1] 

    if (!token) {
      return NextResponse.json({ error: 'Token de autorização não enviado.' }, { status: 401 })
    }

    const body = await request.json()
    const { nome, senha } = body

    if (!nome || !senha || senha.length < 6) {
      return NextResponse.json({ error: 'Nome e senha inválidos.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 401 })
    }

    const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: senha
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { name: nome }
    })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error: any) {
    console.error("Erro na API de Completar Cadastro:", error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}