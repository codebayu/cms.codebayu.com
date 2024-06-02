'use server'

import { revalidatePath } from 'next/cache'
import { ProjectUseCase } from '@/usecase/project'
import { ActionItemState } from '@/types/actions'
import { IProjectPayloadCreate, IProjectPayloadUpdate } from '@/constants/project'

const usecase = new ProjectUseCase()

export async function createProjectAction(
  formData: IProjectPayloadCreate
): Promise<ActionItemState<IProjectPayloadCreate>> {
  try {
    const data = await usecase.createProject(formData)
    revalidatePath('/project')
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

export async function updateProjectAction(
  formData: IProjectPayloadUpdate
): Promise<ActionItemState<IProjectPayloadUpdate>> {
  try {
    const data = await usecase.updateProject(formData)
    revalidatePath('/project')
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
