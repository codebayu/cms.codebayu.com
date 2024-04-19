import 'server-only'
import { ICreatePromotionDto } from '@/use-cases/promotions/types'
import { prisma } from '@/lib/prisma'

export async function createPromotion(promotion: ICreatePromotionDto): Promise<void> {
  await prisma.promotion.create({ data: promotion })
}
