import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios.' }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
    }

    const userRoleDb = await prisma.userRole.findFirst({
      where: { userId: authData.user.id },
      include: { role: true }
    })

    const roleName = userRoleDb?.role?.name || 'volunteer'

    let redirectUrl = '/voluntario'
    
    switch (roleName) {
      case 'super_admin_global':
        redirectUrl = '/admin-master'
        break
      case 'admin':
        redirectUrl = '/admin'
        break
      case 'leader':
        redirectUrl = '/lider'
        break
    }

    return NextResponse.json({ success: true, redirectUrl }, { status: 200 })

  } catch (error) {
    console.error("Erro na API de Login:", error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}