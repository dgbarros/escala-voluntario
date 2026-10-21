import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PlusCircle, Users, Building2, MapPin, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Igreja {
  id: string; 
  name: string;
  cnpj: string | null;
  status: string; 
  _count: {
    users: number;
  };
}

export default function AdminMasterDashboard({igrejas}: {igrejas: Igreja[]}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Gestão de Igrejas
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie todas as filiais e monitore a liderança.
            </p>
          </div>
        </div>
        
        <Link
          href="/admin-master/nova-igreja"
          className={buttonVariants({ className: "w-full sm:w-auto shadow-sm" })}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Igreja
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {igrejas.map((igreja) => (
          <Card key={igreja.id} className="group hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center border group-hover:bg-blue-50 transition-colors">
                  <Building2 size={20} className="text-gray-500 group-hover:text-blue-600" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  igreja.status === 'active' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {igreja.status === 'active' ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 truncate" title={igreja.name}>
                {igreja.name}
              </h3>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="truncate">CNPJ: {igreja.cnpj}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    <strong className="text-gray-900">{igreja._count.users}</strong> {igreja._count.users === 1 ? "Líder" : "Líderes"}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t flex gap-3">
                <Link 
                  href={`/admin-master/igrejas/${igreja.id}`} 
                  className={buttonVariants({ variant: "secondary", className: "w-full group-hover:bg-blue-600 group-hover:text-white transition-colors" })}
                >
                  Acessar <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}