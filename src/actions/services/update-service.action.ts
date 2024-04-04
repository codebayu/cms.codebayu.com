'use server'

import { revalidatePath } from 'next/cache'
import { IService } from '@/use-cases/services/types'
import { updateServiceUseCase } from '@/use-cases/services/update-service.use-case'
import { getService } from '@/data-access/services/get-service.persistence'
import { updateService } from '@/data-access/services/update-service.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'

export async function updateServiceAction(formData: IService): Promise<CreateItemState<IService>> {
  const { getUser } = await auth()
  try {
    await updateServiceUseCase({ getUser, updateService, getService }, { ...formData })
    revalidatePath('/service')
    return {
      form: { ...formData },
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
