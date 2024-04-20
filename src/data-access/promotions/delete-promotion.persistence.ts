import 'server-only'
import { prisma } from '@/lib/prisma'

export async function deletePromotion(itemId: string): Promise<void> {
  await prisma.promotion.delete({ where: { id: itemId } })
}
