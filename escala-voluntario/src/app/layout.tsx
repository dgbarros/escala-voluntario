import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Importação do seu Header Global
import { Header } from "@/components/global/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Escala Voluntário",
  description: "Sistema de gestão de escalas para igrejas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        
        {/* HEADER GLOBAL - Ocupa 100% da tela sempre */}
        <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b">
          <Header />
        </div>
        
        {/* CONTEÚDO RESPONSIVO (Largo no PC, adaptado no Celular) */}
        {/* A propriedade children é onde suas pages (Admin, Voluntário) vão aparecer automaticamente */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </main>
        
      </body>
    </html>
  );
}