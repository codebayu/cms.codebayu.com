import { LearnEntity, LearnEntityValidationError } from '@/entities/learn'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { CreateLearn, ICreateLearnDto } from './types'
import { learnToCreateCareerDtoMapper } from './utils'

export async function createLearnUseCase(
  context: {
    getUser: GetUser
    createLearn: CreateLearn
  },
  data: ICreateLearnDto
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  try {
    const newLearn = new LearnEntity({
      title: data.title,
      description: data.description,
      image: data.image,
      slug: data.slug,
      level: data.level,
      language: data.language,
      isNew: data.isNew,
      isShow: data.isShow
    })
    await context.createLearn(learnToCreateCareerDtoMapper(newLearn))
  } catch (err) {
    const error = err as LearnEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
