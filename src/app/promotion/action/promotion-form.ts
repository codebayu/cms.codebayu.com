'use server'

import { revalidatePath } from 'next/cache'
import { PromotionUseCase } from '@/usecase/promotion'
import { ActionItemState } from '@/types/actions'
import { IPromotionPayloadCreate, IPromotionPayloadUpdate } from '@/constants/promotion'

const usecase = new PromotionUseCase()

export async function createPromotionAction(
  formData: IPromotionPayloadCreate
): Promise<ActionItemState<IPromotionPayloadCreate>> {
  try {
    const data = await usecase.createPromotion(formData)
    revalidatePath('/promotion')
    return {
      form: data,
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    return {
      form: formData,
      status: 'error',
      errors: error.message
    }
  }
}

export async function updatePromotionAction(
  formData: IPromotionPayloadUpdate
): Promise<ActionItemState<IPromotionPayloadUpdate>> {
  try {
    const data = await usecase.updatePromotion(formData)
    revalidatePath('/promotion')
    return {
      form: data,
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    return {
      form: formData,
      status: 'error',
      errors: error.message
    }
  }
}
