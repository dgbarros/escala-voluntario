import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // 1. Cria uma resposta inicial que deixa a requisição seguir em frente
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // 2. Cria o cliente do Supabase específico para o Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Pede para o Supabase checar de forma segura se o usuário está logado
  const { data: { user } } = await supabase.auth.getUser()

  // 4. A REGRA DA CATRACA:
  // Se tentar acessar o /dashboard SEM estar logado, manda pro /login
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Bônus: Se tentar acessar a tela de /login JÁ ESTANDO logado, manda pro /dashboard
  if (user && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// 5. Configuração para dizer em quais rotas o vigia deve prestar atenção
export const config = {
  matcher: [
    // Ele vai vigiar todas as rotas, EXCETO arquivos de sistema, imagens, css, etc.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}