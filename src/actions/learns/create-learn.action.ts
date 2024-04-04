'use server'

import { revalidatePath } from 'next/cache'
import { createLearnUseCase } from '@/use-cases/learns/create-learn.use-case'
import { ICreateLearnDto, ILearn } from '@/use-cases/learns/types'
import { createLearn } from '@/data-access/learns/create-learn.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { generateSlug } from '@/utils/functions'
import { CreateItemState } from '@/types/actions'
import { learnDefaultValueForm } from '@/constants/learn'

export async function createLearnAction(formData: ILearn): Promise<CreateItemState<ICreateLearnDto>> {
  const { getUser } = await auth()
  try {
    const slug = generateSlug(formData.title)
    await createLearnUseCase({ getUser, createLearn }, { ...formData, slug })
    revalidatePath('/learn')
    return {
      form: learnDefaultValueForm,
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
