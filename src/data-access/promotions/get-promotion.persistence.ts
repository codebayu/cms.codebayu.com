import 'server-only'
import { IPromotion } from '@/use-cases/promotions/types'
import { prisma } from '@/lib/prisma'
import { toPromotionDtoMapper } from '@/utils/dto'

export async function getPromotion(itemId: string): Promise<IPromotion> {
  const promotion = await prisma.promotion.findFirst({ where: { id: itemId } })
  if (!promotion) {
    throw new Error('data-access: no promotion found')
  }
  return toPromotionDtoMapper(promotion)
}
