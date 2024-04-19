import { ICreatePromotionDto } from '@/use-cases/promotions/types'

export const promotionDefaultValueForm: ICreatePromotionDto = {
  text: '',
  image: '',
  isShow: false,
  link: '',
  showingOn: []
}
