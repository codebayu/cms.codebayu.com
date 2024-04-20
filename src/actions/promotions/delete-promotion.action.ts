'use server'

import { revalidatePath } from 'next/cache'
import { deletePromotionUseCase } from '@/use-cases/promotions/delete-promotion.use-case'
import { deletePromotion } from '@/data-access/promotions/delete-promotion.persistence'
import { auth } from '@/lib/auth'

export async function deletePromotionAction(promotionId: string) {
  const { getUser } = await auth()
  await deletePromotionUseCase({ getUser, deletePromotion }, { promotionId })
  revalidatePath('/promotion')
}
