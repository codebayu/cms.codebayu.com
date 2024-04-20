import 'server-only'
import { IPromotion } from '@/use-cases/promotions/types'
import { prisma } from '@/lib/prisma'
import { toPromotionDtoMapper } from '@/utils/dto'

export async function getPromotions(): Promise<IPromotion[]> {
  const promotions = await prisma.promotion.findMany({ take: 10 })
  return promotions.map(toPromotionDtoMapper)
}
