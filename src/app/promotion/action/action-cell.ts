'use server'

import { revalidatePath } from 'next/cache'
import { ProjectUseCase } from '@/usecase/project'

export async function deletePromotionAction(id: string) {
  const usecase = new ProjectUseCase()
  await usecase.deleteProject(id)
  revalidatePath('/promotion')
}
