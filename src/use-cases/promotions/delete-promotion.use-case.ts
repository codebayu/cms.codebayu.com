import { AuthenticationError } from '@/utils/error'
import { GetUser } from '../users/types'
import { DeletePromotion } from './types'

export async function deletePromotionUseCase(
  context: {
    getUser: GetUser
    deletePromotion: DeletePromotion
  },
  data: { promotionId: string }
) {
  const user = context.getUser()

  if (!user) {
    throw new AuthenticationError()
  }

  await context.deletePromotion(data.promotionId)
}
