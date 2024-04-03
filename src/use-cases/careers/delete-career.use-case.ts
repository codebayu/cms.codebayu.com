import { AuthenticationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { DeleteCareer } from './types'

export async function deleteCareerUseCase(
  context: {
    getUser: GetUser
    deleteCareer: DeleteCareer
  },
  data: { careerId: string }
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  await context.deleteCareer(data.careerId)
}
