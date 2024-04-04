'use server'

import { revalidatePath } from 'next/cache'
import { createServiceUseCase } from '@/use-cases/services/create-service.use-case'
import { ICreateServiceDto, IService } from '@/use-cases/services/types'
import { createService } from '@/data-access/services/create-service.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'
import { serviceDefaultValueForm } from '@/constants/service'

export async function createServiceAction(formData: IService): Promise<CreateItemState<ICreateServiceDto>> {
  const { getUser } = await auth()
  try {
    await createServiceUseCase({ getUser, createService }, { ...formData })
    revalidatePath('/service')
    return {
      form: serviceDefaultValueForm,
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    if (error instanceof ValidationError) {
      return {
        form: formData,
        status: 'field-errors',
        errors: error.getErrors()
      }
    } else {
      return {
        form: formData,
        status: 'error',
        errors: error.message
      }
    }
  }
}