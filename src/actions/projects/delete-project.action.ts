'use server'

import { revalidatePath } from 'next/cache'
import { deleteProjectUseCase } from '@/use-cases/projects/delete-career.use-case'
import { deleteProject } from '@/data-access/projects/delete-project.persistence'
import { auth } from '@/lib/auth'

export async function deleteProjectAction(projectId: string) {
  const { getUser } = await auth()
  await deleteProjectUseCase({ getUser, deleteProject }, { projectId })
  revalidatePath('/project')
}
