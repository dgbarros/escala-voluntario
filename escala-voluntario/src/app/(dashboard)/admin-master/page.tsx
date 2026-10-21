import AdminMasterDashboard  from "@/components/dashboard/admin-master/admin-master"
import {prisma} from "@/lib/prisma"
 
export default async function AdminMaster(){
    const igrejas = await prisma.church.findMany({
        orderBy: {name: 'asc'},
        include: {_count: {select: {users: true}}}
    })

    return <AdminMasterDashboard igrejas={igrejas}/>
}