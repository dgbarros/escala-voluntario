import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {

  // 1. CRIANDO AS PERMISSÕES (Se já existirem, o upsert ignora)
  const permissions = [
    { name: 'manage_churches', description: 'Criar, editar e suspender igrejas' },
    { name: 'manage_users', description: 'Criar e editar usuários e líderes' },
    { name: 'manage_departments', description: 'Criar e editar departamentos' },
    { name: 'manage_schedules', description: 'Criar e editar escalas de cultos' },
    { name: 'confirm_presence', description: 'Confirmar ou recusar escala' }
  ]

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: {
        name: perm.name,
        description: perm.description,
      },
    })
  }

  // 2. BUSCANDO OS CARGOS (ROLES) QUE VOCÊ JÁ INSERIU
  const superAdmin = await prisma.role.findUnique({ where: { name: 'super_admin_global' } })
  const admin = await prisma.role.findUnique({ where: { name: 'admin' } })
  const leader = await prisma.role.findUnique({ where: { name: 'leader' } })
  const volunteer = await prisma.role.findUnique({ where: { name: 'volunteer' } })

  if (!superAdmin || !admin || !leader || !volunteer) {
    throw new Error(' Alguma Role não foi encontrada. Certifique-se de que elas estão no banco com esses exatos nomes.')
  }

  // 3. BUSCANDO AS PERMISSÕES RECÉM-CRIADAS
  const getPerm = async (name: string) => prisma.permission.findUnique({ where: { name } })
  const permManageChurches = await getPerm('manage_churches')
  const permManageUsers = await getPerm('manage_users')
  const permManageDepartments = await getPerm('manage_departments')
  const permManageSchedules = await getPerm('manage_schedules')
  const permConfirmPresence = await getPerm('confirm_presence')

  // 4. VINCULANDO PERMISSÕES AOS CARGOS (RolePermissions)
  
  // Regra 1: Super Admin (Você)
  if (permManageChurches) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: superAdmin.id, permissionId: permManageChurches.id } },
      update: {},
      create: { roleId: superAdmin.id, permissionId: permManageChurches.id },
    })
  }

  // Regra 2: Admin (Igreja)
  if (permManageUsers && permManageDepartments) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: admin.id, permissionId: permManageUsers.id } },
      update: {},
      create: { roleId: admin.id, permissionId: permManageUsers.id },
    })
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: admin.id, permissionId: permManageDepartments.id } },
      update: {},
      create: { roleId: admin.id, permissionId: permManageDepartments.id },
    })
  }

  // Regra 3: Líder (Departamento)
  if (permManageSchedules) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: leader.id, permissionId: permManageSchedules.id } },
      update: {},
      create: { roleId: leader.id, permissionId: permManageSchedules.id },
    })
  }

  // Regra 4: Voluntário
  if (permConfirmPresence) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: volunteer.id, permissionId: permConfirmPresence.id } },
      update: {},
      create: { roleId: volunteer.id, permissionId: permConfirmPresence.id },
    })
  }
  
}

main()
  .catch((e) => {
    console.error(' Erro no Seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })