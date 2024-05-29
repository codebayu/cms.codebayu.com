'use server'

import { revalidatePath } from 'next/cache'
import { CareerUseCase } from '@/usecase/career'

export async function deleteCareerAction(id: string) {
  const usecase = new CareerUseCase()
  await usecase.deleteCareer(id)
  revalidatePath('/career')
}
