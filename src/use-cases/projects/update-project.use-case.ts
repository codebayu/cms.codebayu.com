import { ProjectEntity, ProjectEntityValidationError } from '@/entities/project'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { GetProject, IProject, UpdateProject } from './types'
import { projectToDto } from './utils'

export async function updateProjectUseCase(
  context: {
    getUser: GetUser
    getProject: GetProject
    updateProject: UpdateProject
  },
  data: IProject
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  if (!data.id) {
    throw new Error('use-case: expected project to have an id')
  }

  const existingProject = await context.getProject(data.id)

  if (!existingProject) {
    throw new Error('use-case: no project found')
  }

  try {
    const newProject = new ProjectEntity({ ...data })
    await context.updateProject(projectToDto(newProject))
  } catch (err) {
    const error = err as ProjectEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
