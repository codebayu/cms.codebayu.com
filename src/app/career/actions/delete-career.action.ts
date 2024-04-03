'use server'

import { revalidatePath } from 'next/cache'
import { deleteCareerUseCase } from '@/use-cases/careers/delete-career.use-case'
import { deleteCareer } from '@/data-access/careers/delete-career.persistence'
import { auth } from '@/lib/auth'

export async function deleteCareerAction(careerId: string) {
  const { getUser } = await auth()
  await deleteCareerUseCase({ getUser, deleteCareer }, { careerId })
  revalidatePath('/career')
}
