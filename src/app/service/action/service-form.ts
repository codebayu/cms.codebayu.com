'use server'

import { revalidatePath } from 'next/cache'
import { ServiceUseCase } from '@/usecase/service'
import { ActionItemState } from '@/types/actions'
import { IServicePayloadCreate, IServicePayloadUpdate } from '@/constants/service'

const usecase = new ServiceUseCase()

export async function createServiceAction(
  formData: IServicePayloadCreate
): Promise<ActionItemState<IServicePayloadCreate>> {
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

export async function updateServiceAction(
  formData: IServicePayloadUpdate
): Promise<ActionItemState<IServicePayloadUpdate>> {
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
