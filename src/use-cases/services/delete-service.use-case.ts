import { AuthenticationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { DeleteService } from './types'

export async function deleteServiceUseCase(
  context: {
    getUser: GetUser
    deleteService: DeleteService
  },
  data: { serviceId: string }
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  await context.deleteService(data.serviceId)
}
