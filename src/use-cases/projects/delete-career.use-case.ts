import { AuthenticationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { DeleteProject } from './types'

export async function deleteProjectUseCase(
  context: {
    getUser: GetUser
    deleteProject: DeleteProject
  },
  data: { projectId: string }
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  await context.deleteProject(data.projectId)
}
