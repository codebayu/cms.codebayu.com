import { z } from 'zod'

export const promotionDefaultValueForm = {
  text: '',
  image: '',
  isShow: false,
  link: '',
  showingOn: [],
  createdAt: new Date(),
  updatedAt: null
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
  createdAt: Date
  updatedAt: Date | null
}

export type IPromotionPayloadCreate = {
  text: string
  link: string
  image: string
  showingOn: string[]
  isShow: boolean
}

export type IPromotionPayloadUpdate = { id: string } & IPromotionPayloadCreate

export const promotionSchema = z.object({
  text: z.string().min(1),
  link: z.string().min(1),
  image: z.string().min(1),
  isShow: z.boolean(),
  showingOn: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  })
})
