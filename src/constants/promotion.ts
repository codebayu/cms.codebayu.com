import { z } from 'zod'

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

export const promotionSchema = z.object({
  text: z.string().min(1),
  link: z.string().min(1),
  image: z.string().min(1),
  isShow: z.boolean(),
  showingOn: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  })
})
