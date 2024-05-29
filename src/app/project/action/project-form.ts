'use server'

import { revalidatePath } from 'next/cache'
import { ProjectUseCase } from '@/usecase/project'
import { CreateItemState } from '@/types/actions'
import { ICreateProjectDto, IProject } from '@/constants/project'

const usecase = new ProjectUseCase()

export async function createProjectAction(formData: ICreateProjectDto): Promise<CreateItemState<ICreateProjectDto>> {
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

export async function updateProjectAction(formData: IProject): Promise<CreateItemState<IProject>> {
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
