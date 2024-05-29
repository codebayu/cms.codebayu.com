'use server'

import { revalidatePath } from 'next/cache'
import { LearnUseCase } from '@/usecase/learn'
import { CreateItemState } from '@/types/actions'
import { ICreateLearnDto, ILearn } from '@/constants/learn'

const usecase = new LearnUseCase()

export async function createLearnAction(formData: ILearn): Promise<CreateItemState<ICreateLearnDto>> {
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

export async function updateLearnAction(formData: ILearn): Promise<CreateItemState<ILearn>> {
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
