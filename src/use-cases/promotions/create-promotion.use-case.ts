import { PromotionEntity, PromotionEntityValidationError } from '@/entities/promotion'
import { AuthenticationError, ValidationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { CreatePromotion, ICreatePromotionDto } from './types'
import { promotionToCreatePromotionDtoMapper } from './utils'

export async function createPromotionUseCase(
  context: {
    getUser: GetUser
    createPromotion: CreatePromotion
  },
  data: ICreatePromotionDto
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  try {
    const newPromotion = new PromotionEntity({ ...data })
    await context.createPromotion(promotionToCreatePromotionDtoMapper(newPromotion))
  } catch (err) {
    const error = err as PromotionEntityValidationError
    throw new ValidationError(error.getErrors())
  }
}
