import 'server-only'
import { IPromotion } from '@/use-cases/promotions/types'
import { prisma } from '@/lib/prisma'

export async function updatePromotion(promotion: IPromotion): Promise<void> {
  await prisma.promotion.update({ data: promotion, where: { id: promotion.id } })
}
