'use server'

import { revalidatePath } from 'next/cache'
import { ProjectUseCase } from '@/usecase/project'

export async function deleteProjectAction(id: string) {
  const usecase = new ProjectUseCase()
  await usecase.deleteProject(id)
  revalidatePath('/project')
}
