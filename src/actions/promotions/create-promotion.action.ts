'use server'

import { revalidatePath } from 'next/cache'
import { createPromotionUseCase } from '@/use-cases/promotions/create-promotion.use-case'
import { ICreatePromotionDto } from '@/use-cases/promotions/types'
import { createPromotion } from '@/data-access/promotions/create-promotion.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'
import { promotionDefaultValueForm } from '@/constants/promotion'

export async function createPromotionAction(
  formData: ICreatePromotionDto
): Promise<CreateItemState<ICreatePromotionDto>> {
  const { getUser } = await auth()
  try {
    await createPromotionUseCase({ getUser, createPromotion }, { ...formData })
    revalidatePath('/promotion')
    return {
      form: { ...promotionDefaultValueForm },
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    if (error instanceof ValidationError) {
      return {
        form: formData,
        status: 'field-errors',
        errors: error.getErrors()
      }
    } else {
      return {
        form: formData,
        status: 'error',
        errors: error.message
      }
    }
  }
}
