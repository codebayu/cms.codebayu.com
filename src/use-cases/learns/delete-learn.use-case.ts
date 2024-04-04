import { AuthenticationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { DeleteLearn } from './types'

export async function deleteLearnUseCase(
  context: {
    getUser: GetUser
    deleteLearn: DeleteLearn
  },
  data: { learnId: string }
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  await context.deleteLearn(data.learnId)
}
