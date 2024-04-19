import { ProjectEntity, ProjectEntityValidationError } from '@/entities/project'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { CreateProject, ICreateProjectDto } from './types'
import { projectToCreateProjectDtoMapper } from './utils'

export async function createProjectUseCase(
  context: {
    getUser: GetUser
    createProject: CreateProject
  },
  data: ICreateProjectDto
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  try {
    const newProject = new ProjectEntity({ ...data })
    await context.createProject(projectToCreateProjectDtoMapper(newProject))
  } catch (err) {
    const error = err as ProjectEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
