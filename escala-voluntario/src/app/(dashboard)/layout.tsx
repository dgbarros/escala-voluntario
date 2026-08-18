import { Header } from "@/components/global/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER GLOBAL DO SISTEMA */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b">
        <Header />
      </div>
      
      {/* CONTEÚDO RESPONSIVO */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}