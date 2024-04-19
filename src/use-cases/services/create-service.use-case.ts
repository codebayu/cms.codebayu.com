import { ServiceEntity, ServiceEntityValidationError } from '@/entities/service'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { CreateService, ICreateServiceDto } from './types'
import { serviceToCreateCareerDtoMapper } from './utils'

export async function createServiceUseCase(
  context: {
    getUser: GetUser
    createService: CreateService
  },
  data: ICreateServiceDto
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  try {
    const newService = new ServiceEntity({ ...data })
    await context.createService(serviceToCreateCareerDtoMapper(newService))
  } catch (err) {
    const error = err as ServiceEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
