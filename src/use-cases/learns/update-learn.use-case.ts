import { LearnEntityValidationError } from '@/entities/learn'
import { LearnEntity } from '@/entities/learn'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { GetLearn, ILearn, UpdateLearn } from './types'
import { learnToDto } from './utils'

export async function updateLearnUseCase(
  context: {
    getUser: GetUser
    getLearn: GetLearn
    updateLearn: UpdateLearn
  },
  data: ILearn
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  if (!data.id) {
    throw new Error('use-case: expected learn to have an id')
  }

  const existingLearn = await context.getLearn(data.id)

  if (!existingLearn) {
    throw new Error('use-case: no learn found')
  }

  try {
    const newLearn = new LearnEntity({
      id: data.id,
      slug: data.slug,
      title: data.title,
      description: data.description,
      image: data.image,
      level: data.level,
      language: data.language,
      isFeatured: data.isFeatured,
      isShow: data.isShow
    })
    await context.updateLearn(learnToDto(newLearn))
  } catch (err) {
    const error = err as LearnEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
