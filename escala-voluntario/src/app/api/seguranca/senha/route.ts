import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { senha } = body

    // 1. Validação de segurança básica no Back-end (nunca confie só no Front-end!)
    if (!senha || senha.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres.' }, 
        { status: 400 }
      )
    }

    // 2. Inicializa o cliente do Supabase e lê os cookies
    const supabase = await createClient()

    // 3. Descobre quem é o usuário que está fazendo a requisição
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado. Você precisa estar logado para alterar a senha.' }, 
        { status: 401 }
      )
    }

    // 4. A Mágica: Pede ao Supabase para atualizar a senha do usuário autenticado
    const { error: updateError } = await supabase.auth.updateUser({
      password: senha
    })

    if (updateError) {
      console.error("Erro do Supabase ao atualizar senha:", updateError)
      return NextResponse.json(
        { error: 'Não foi possível atualizar a senha. Tente novamente mais tarde.' }, 
        { status: 400 }
      )
    }

    // 5. Sucesso!
    return NextResponse.json({ success: true, message: 'Senha atualizada com sucesso!' }, { status: 200 })

  } catch (error) {
    console.error("Erro na API de senha:", error)
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 })
  }
}