import { CareerEntity, CareerEntityValidationError } from '@/entities/career'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { GetCareer, ICareer, UpdateCareer } from './types'
import { careerToDto } from './utils'

export async function updateCareerUseCase(
  context: {
    getUser: GetUser
    getCareer: GetCareer
    updateCareer: UpdateCareer
  },
  data: ICareer
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  if (!data.id) {
    throw new Error('use-case: expected career to have an id')
  }

  const existingCareer = await context.getCareer(data.id)

  if (!existingCareer) {
    throw new Error('use-case: no career found')
  }

  try {
    const newCareer = new CareerEntity({
      id: data.id,
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
    await context.updateCareer(careerToDto(newCareer))
  } catch (err) {
    const error = err as CareerEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
