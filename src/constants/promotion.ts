import { ICreatePromotionDto } from '@/use-cases/promotions/types'

export const promotionDefaultValueForm: ICreatePromotionDto = {
  text: '',
  image: '',
  isShow: false,
  link: '',
  showingOn: []
}

export const pageOptions = [
  {
    id: '/',
    label: 'Home'
  },
  {
    id: '/roadmap',
    label: 'Roadmap'
  },
  {
    id: '/me',
    label: 'Me'
  }
] as const
