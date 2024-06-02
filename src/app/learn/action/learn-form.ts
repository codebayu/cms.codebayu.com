'use server'

import { revalidatePath } from 'next/cache'
import { LearnUseCase } from '@/usecase/learn'
import { ActionItemState } from '@/types/actions'
import { ILearnPayloadCreate, ILearnPayloadUpdate } from '@/constants/learn'

const usecase = new LearnUseCase()

export async function createLearnAction(formData: ILearnPayloadCreate): Promise<ActionItemState<ILearnPayloadCreate>> {
  try {
    const data = await usecase.createLearn(formData)
    revalidatePath('/learn')
    return {
      form: data,
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    return {
      form: formData,
      status: 'error',
      errors: error.message
    }
  }
}

export async function updateLearnAction(formData: ILearnPayloadUpdate): Promise<ActionItemState<ILearnPayloadUpdate>> {
  try {
    const data = await usecase.updateLearn(formData)
    revalidatePath('/learn')
    return {
      form: data,
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    return {
      form: formData,
      status: 'error',
      errors: error.message
    }
  }
}
