import { PromotionEntity, PromotionEntityValidationError } from '@/entities/promotion'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { GetPromotion, IPromotion, UpdatePromotion } from './types'
import { promotionToDto } from './utils'

export async function updatePromotionUseCase(
  context: {
    getUser: GetUser
    getPromotion: GetPromotion
    updatePromotion: UpdatePromotion
  },
  data: IPromotion
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  if (!data.id) {
    throw new Error('use-case: expected promotion to have an id')
  }

  const existingCareer = await context.getPromotion(data.id)

  if (!existingCareer) {
    throw new Error('use-case: no promotion found')
  }

  try {
    const newPromotion = new PromotionEntity({ ...data })
    await context.updatePromotion(promotionToDto(newPromotion))
  } catch (err) {
    const error = err as PromotionEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
