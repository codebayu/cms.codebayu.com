'use server'

import { revalidatePath } from 'next/cache'
import { ICareer } from '@/use-cases/careers/types'
import { updateCareerUseCase } from '@/use-cases/careers/update-career.use-case'
import { getCareer } from '@/data-access/careers/get-career.persistence'
import { updateCareer } from '@/data-access/careers/update-career.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'

export async function updateCareerAction(formData: ICareer): Promise<CreateItemState<ICareer>> {
  const { getUser } = await auth()
  try {
    await updateCareerUseCase({ getUser, updateCareer, getCareer }, { ...formData })
    revalidatePath('/career')
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
