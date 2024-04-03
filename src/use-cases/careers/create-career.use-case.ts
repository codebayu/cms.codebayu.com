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
    const newCareer = new CareerEntity({
      position: data.position,
      company: data.company,
      logo: data.logo,
      location: data.location,
      locationType: data.locationType,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      link: data.link,
      slug: data.slug
    })
    await context.createCareer(careerToCreateCareerDtoMapper(newCareer))
  } catch (err) {
    const error = err as CareerEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
