import { ServiceEntity, ServiceEntityValidationError } from '@/entities/service'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { GetService, IService, UpdateService } from './types'
import { serviceToDto } from './utils'

export async function updateServiceUseCase(
  context: {
    getUser: GetUser
    getService: GetService
    updateService: UpdateService
  },
  data: IService
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  if (!data.id) {
    throw new Error('use-case: expected service to have an id')
  }

  const existingService = await context.getService(data.id)

  if (!existingService) {
    throw new Error('use-case: no service found')
  }

  try {
    const newService = new ServiceEntity({
      id: data.id,
      title: data.title,
      description: data.description,
      tag: data.tag
    })
    await context.updateService(serviceToDto(newService))
  } catch (err) {
    const error = err as ServiceEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
