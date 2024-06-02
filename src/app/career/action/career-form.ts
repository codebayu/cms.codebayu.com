'use server'

import { revalidatePath } from 'next/cache'
import { CareerUseCase } from '@/usecase/career'
import { ActionItemState } from '@/types/actions'
import { ICareerPayloadCreate, ICareerPayloadUpdate } from '@/constants/career'

const usecase = new CareerUseCase()

export async function createCareerAction(
  formData: ICareerPayloadCreate
): Promise<ActionItemState<ICareerPayloadCreate>> {
  try {
    const data = await usecase.createCareer(formData)
    revalidatePath('/career')
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

export async function updateCareerAction(
  formData: ICareerPayloadUpdate
): Promise<ActionItemState<ICareerPayloadUpdate>> {
  try {
    const data = await usecase.updateCareer(formData)
    revalidatePath('/career')
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
