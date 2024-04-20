import { PromotionEntity } from '@/entities/promotion'
import { ICreatePromotionDto, IPromotion } from './types'

export function promotionToCreatePromotionDtoMapper(promotion: PromotionEntity): ICreatePromotionDto {
  return {
    text: promotion.getText(),
    image: promotion.getImage(),
    isShow: promotion.getIsShow(),
    link: promotion.getLink(),
    showingOn: promotion.getShowingOn()
  }
}

export function promotionToDto(promotion: PromotionEntity): IPromotion {
  const promotionId = promotion.getId()

  if (!promotionId) {
    throw new Error('dto: expected promotion to have an id')
  }

  return {
    id: promotionId,
    text: promotion.getText(),
    image: promotion.getImage(),
    isShow: promotion.getIsShow(),
    link: promotion.getLink(),
    showingOn: promotion.getShowingOn()
  }
}
