import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, cnpj, telefone, admins } = body

    if (!nome || !admins || admins.length === 0) {
      return NextResponse.json({ error: 'O nome da igreja e pelo menos um administrador são obrigatórios.' }, { status: 400 })
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const resultado = await prisma.$transaction(async (tx) => {
      
      const novaIgreja = await tx.church.create({
        data: { 
          name: nome, 
          cnpj: cnpj || null, 
        }
      })

      const adminRole = await tx.role.findUnique({ where: { name: 'admin' } })
      if (!adminRole) throw new Error("A role 'admin' não está configurada no banco de dados.")

      for (const email of admins) {
        
        const { data: linkData, error: authError } = await supabaseAdmin.auth.admin.generateLink({
          type: 'invite',
          email: email,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/completar-cadastro` 
          }
        })

        if (authError || !linkData.properties?.action_link) {
          throw new Error(`Falha ao gerar link no Supabase para ${email}.`)
        }

        const novoUserId = linkData.user.id
        const linkDeConvite = linkData.properties.action_link
        
        await tx.user.create({
          data: { 
            id: novoUserId, 
            name: 'Administrador Convidado', // Nome temporário
            email: email, 
            role: 'admin', 
            churchId: novaIgreja.id 
          }
        })

        await tx.userRole.create({
          data: { 
            userId: novoUserId, 
            roleId: adminRole.id, 
            churchId: novaIgreja.id 
          }
        })

        // D. Dispara o E-mail via Resend
        await resend.emails.send({
          from: 'Escala Voluntário <onboarding@resend.dev>', // Em teste no Resend, só podemos usar o e-mail deles ou um domínio verificado
          to: email, // O e-mail de teste precisa estar liberado lá no painel do Resend se o domínio não for verificado
          subject: `Você foi convidado para gerenciar: ${nome}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Bem-vindo ao Escala Voluntário!</h2>
              <p>Você foi designado como administrador para a igreja <strong>${nome}</strong>.</p>
              <p>Para definir sua senha e acessar o painel, clique no botão abaixo:</p>
              <a href="${linkDeConvite}" style="display:inline-block; padding:12px 24px; background-color:#2563eb; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold; margin-top:16px;">
                Completar meu Cadastro
              </a>
              <p style="margin-top:24px; font-size:12px; color:#666;">Este link é seguro e expira em 24 horas.</p>
            </div>
          `
        })
      }

      return novaIgreja
    },{
      maxWait: 10000, 
      timeout: 25000
    })

    return NextResponse.json({ success: true, church: resultado }, { status: 201 })

  } catch (error: any) {
    console.error("Erro na API de Igrejas:", error)
    return NextResponse.json({ error: error.message || 'Erro interno do servidor.' }, { status: 500 })
  }
}