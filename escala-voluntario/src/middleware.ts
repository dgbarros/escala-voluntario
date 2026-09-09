import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  const path = request.nextUrl.pathname;

  const rotasProtegidas = ["/admin-master", "/admin", "/lider", "/voluntario"];
  const estaTentandoAcessarRotaProtegida = rotasProtegidas.some((rota) =>
    path.startsWith(rota),
  );

  if (!user && estaTentandoAcessarRotaProtegida) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user) {
    // 1. Buscamos o cargo na tabela relacional "user_roles"
    const { data: cargoData, error } = await supabase
      .from("user_roles")
      .select("roles(name)")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    const rolesRetorno = cargoData?.roles as any;
    
    // 2. Se for um Array pegamos o primeiro [0], se for Objeto pegamos direto.
    const role = (Array.isArray(rolesRetorno) ? rolesRetorno[0]?.name : rolesRetorno?.name) || "volunteer";


    if (path.startsWith("/admin-master") && role !== "super_admin_global") {
      return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
    }

    if (path.startsWith("/admin") && path !== "/admin-master" && role !== "admin" && role !== "super_admin_global") {
      return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
    }

    if (path.startsWith("/lider") && role !== "leader" && role !== "admin" && role !== "super_admin_global") {
      return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
    }

    
    if (path === "/login") {
      let dashboardPath = "/voluntario";

      switch (role) {
        case "super_admin_global":
          dashboardPath = "/admin-master";
          break;
        case "admin":
          dashboardPath = "/admin";
          break;
        case "leader":
          dashboardPath = "/lider";
          break;
        case "volunteer":
          dashboardPath = "/voluntario";
          break;
      }
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};