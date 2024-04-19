import { CareerEntity, CareerEntityValidationError } from '@/entities/career'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { CreateCareer, ICreateCareerDto } from './types'
import { careerToCreateCareerDtoMapper } from './utils'

export async function createCareerUseCase(
  context: {
    getUser: GetUser
    createCareer: CreateCareer
  },
  data: ICreateCareerDto
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  try {
    const newCareer = new CareerEntity({ ...data })
    await context.createCareer(careerToCreateCareerDtoMapper(newCareer))
  } catch (err) {
    const error = err as CareerEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
