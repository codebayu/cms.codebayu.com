'use server'

import { revalidatePath } from 'next/cache'
import { ILearn } from '@/use-cases/learns/types'
import { updateLearnUseCase } from '@/use-cases/learns/update-learn.use-case'
import { getLearn } from '@/data-access/learns/get-learn.persistence'
import { updateLearn } from '@/data-access/learns/update-learn.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'

export async function updateLearnAction(formData: ILearn): Promise<CreateItemState<ILearn>> {
  const { getUser } = await auth()
  try {
    await updateLearnUseCase({ getUser, updateLearn, getLearn }, { ...formData })
    revalidatePath('/learn')
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
