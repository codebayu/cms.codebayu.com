'use server'

import { revalidatePath } from 'next/cache'
import { ServiceUseCase } from '@/usecase/service'
import { CreateItemState } from '@/types/actions'
import { ICreateServiceDto, IService } from '@/constants/service'

const usecase = new ServiceUseCase()

export async function createServiceAction(formData: IService): Promise<CreateItemState<ICreateServiceDto>> {
  try {
    const data = await usecase.createService(formData)
    revalidatePath('/service')
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

export async function updateServiceAction(formData: IService): Promise<CreateItemState<IService>> {
  try {
    const data = await usecase.updateService(formData)
    revalidatePath('/service')
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
