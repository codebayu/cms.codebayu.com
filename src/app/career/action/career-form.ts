'use server'

import { revalidatePath } from 'next/cache'
import { CareerUseCase } from '@/usecase/career'
import { CreateItemState } from '@/types/actions'
import { ICareer, ICreateCareerDto } from '@/constants/career'

const usecase = new CareerUseCase()

export async function createCareerAction(formData: ICreateCareerDto): Promise<CreateItemState<ICreateCareerDto>> {
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

export async function updateCareerAction(formData: ICareer): Promise<CreateItemState<ICareer>> {
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
