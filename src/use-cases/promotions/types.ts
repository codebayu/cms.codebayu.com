export type IPromotion = {
  id?: string
  text: string
  link: string
  image: string
  showingOn: string[]
  isShow: boolean
}

export type ICreatePromotionDto = {
  text: string
  link: string
  image: string
  showingOn: string[]
  isShow: boolean
}

export type CreatePromotion = (promotion: ICreatePromotionDto) => void
export type DeletePromotion = (promotionId: string) => void
export type UpdatePromotion = (promotion: IPromotion) => void
export type GetPromotion = (promotionId: string) => Promise<IPromotion>
