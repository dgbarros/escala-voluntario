import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, nomeIgreja } = await request.json()

    if (!email || !nomeIgreja) {
      return NextResponse.json({ error: 'E-mail e nome da igreja são obrigatórios.' }, { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: linkData, error: authError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'invite',
      email: email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/completar-cadastro`
      }
    })

    if (authError || !linkData.properties?.action_link) {
      throw new Error('Falha ao gerar novo link no Supabase.')
    }

    const linkDeConvite = linkData.properties.action_link
    const linkEscudo = `${process.env.NEXT_PUBLIC_SITE_URL}/aceitar-convite?url=${encodeURIComponent(linkDeConvite)}`

    const { error: resendError } = await resend.emails.send({
      from: 'Escala Voluntário <equipe@escalavoluntario.com.br>', 
      to: email,
      subject: `Reenvio de Convite: Acesso ao sistema da ${nomeIgreja}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Seu convite foi renovado!</h2>
          <p>Você foi convidado novamente para gerenciar a igreja <strong>${nomeIgreja}</strong>.</p>
          <a href="${linkEscudo}" style="display:inline-block; padding:12px 24px; background-color:#2563eb; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold; margin-top:16px;">
            Acessar Sistema
          </a>
        </div>
      `
    })

    if (resendError) throw new Error(resendError.message)

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}