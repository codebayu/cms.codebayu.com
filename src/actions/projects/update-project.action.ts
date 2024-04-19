'use server'

import { revalidatePath } from 'next/cache'
import { IProject } from '@/use-cases/projects/types'
import { updateProjectUseCase } from '@/use-cases/projects/update-project.use-case'
import { getProject } from '@/data-access/projects/get-project.persistence'
import { updateProject } from '@/data-access/projects/update-project.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'

export async function updateProjectAction(formData: IProject): Promise<CreateItemState<IProject>> {
  const { getUser } = await auth()
  try {
    await updateProjectUseCase({ getUser, updateProject, getProject }, { ...formData })
    revalidatePath('/project')
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
