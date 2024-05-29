'use server'

import { revalidatePath } from 'next/cache'
import { LearnUseCase } from '@/usecase/learn'

export async function deleteLearnAction(id: string) {
  const usecase = new LearnUseCase()
  await usecase.deleteLearn(id)
  revalidatePath('/learn')
}
