'use server'

import { revalidatePath } from 'next/cache'
import { deleteLearnUseCase } from '@/use-cases/learns/delete-learn.use-case'
import { deleteLearn } from '@/data-access/learns/delete-learn.persistence'
import { auth } from '@/lib/auth'

export async function deleteLearnAction(learnId: string) {
  const { getUser } = await auth()
  await deleteLearnUseCase({ getUser, deleteLearn }, { learnId })
  revalidatePath('/learn')
}
