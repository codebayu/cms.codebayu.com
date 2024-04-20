'use server'

import { revalidatePath } from 'next/cache'
import { IPromotion } from '@/use-cases/promotions/types'
import { updatePromotionUseCase } from '@/use-cases/promotions/update-promotion.use-case'
import { getPromotion } from '@/data-access/promotions/get-promotion.persistence'
import { updatePromotion } from '@/data-access/promotions/update-promotion.persistence'
import { auth } from '@/lib/auth'
import { ValidationError } from '@/utils/error'
import { CreateItemState } from '@/types/actions'

export async function updatePromotionAction(formData: IPromotion): Promise<CreateItemState<IPromotion>> {
  const { getUser } = await auth()
  try {
    await updatePromotionUseCase({ getUser, updatePromotion, getPromotion }, { ...formData })
    revalidatePath('/promotion')
    return {
      form: { ...formData },
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
