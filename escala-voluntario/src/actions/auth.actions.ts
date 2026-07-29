'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma' 

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError || !authData.user) {
    return { error: 'E-mail ou senha incorretos.' }
  }

  const userDb = await prisma.user.findUnique({
    where: {
      id: authData.user.id, 
    },
    select: {
      role: true, 
    },
  })

  if (!userDb || !userDb.role) {
    redirect('/login?error=unauthorized')
  }

  switch (userDb.role) {
    case 'super_admin_global':{
      redirect('/admin-master')
    }
      
    case 'admin':{
      redirect('/dashboard/admin')
    }
      
    case 'Leader':{
      redirect('/dashboard/lider')
    }
      
    case 'volunteer':{
      redirect('/dashboard/escalas')
    }
      
    default:{
      redirect('/login?error=unauthorized')
    }
  }
}