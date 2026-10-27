import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Building2, Users } from 'lucide-react'
import BotaoReenviar from '@/components/dashboard/admin-master/botao-reenviar' 

//Aqui irei precisar reestruturar, é apenas temporário. 

export default async function DetalhesIgreja({ params }: { params: { id: string } }) {

    const {id} = await params;
  
  const igreja = await prisma.church.findUnique({
    where: { 
      id: id 
    },
    include: {
      users: true 
    }
  })

  if (!igreja) {
    notFound()
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-6">
      
      {/* Cabeçalho Provisório da Igreja */}
      <div className="flex items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{igreja.name}</h1>
          <p className="text-sm text-gray-500">Detalhes e administração da congregação</p>
        </div>
      </div>

      {/* Lista de Administradores */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-gray-500" />
          Liderança Registrada
        </h2>

        <div className="divide-y">
          {igreja.users.map((usuario) => (
            <div key={usuario.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-medium text-gray-900">{usuario.name}</p>
                <p className="text-sm text-gray-500">{usuario.email}</p>
              </div>
              
              {/* Nosso Client Component em ação passando as props! */}
              <BotaoReenviar 
                email={usuario.email} 
                nomeIgreja={igreja.name} 
              />
            </div>
          ))}
          
          {igreja.users.length === 0 && (
            <p className="py-4 text-gray-500 text-sm">Nenhum líder cadastrado ainda.</p>
          )}
        </div>
      </div>

    </div>
  )
}