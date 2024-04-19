'use server'

import { revalidatePath } from 'next/cache'
import { createProjectUseCase } from '@/use-cases/projects/create-project.use-case'
import { ICreateProjectDto } from '@/use-cases/projects/types'
import { createProject } from '@/data-access/projects/create-project.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'
import { projectDefaultValueForm } from '@/constants/project'

export async function createProjectAction(formData: ICreateProjectDto): Promise<CreateItemState<ICreateProjectDto>> {
  const { getUser } = await auth()
  try {
    await createProjectUseCase({ getUser, createProject }, { ...formData })
    revalidatePath('/project')
    return {
      form: { ...projectDefaultValueForm },
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
