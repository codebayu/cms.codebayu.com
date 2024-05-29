'use server'

import { revalidatePath } from 'next/cache'
import { PromotionUseCase } from '@/usecase/promotion'
import { CreateItemState } from '@/types/actions'
import { ICreatePromotionDto, IPromotion } from '@/constants/promotion'

const usecase = new PromotionUseCase()

export async function createPromotionAction(
  formData: ICreatePromotionDto
): Promise<CreateItemState<ICreatePromotionDto>> {
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

export async function updatePromotionAction(formData: IPromotion): Promise<CreateItemState<IPromotion>> {
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
