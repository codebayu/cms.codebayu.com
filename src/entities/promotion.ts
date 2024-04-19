import { ZodError, z } from 'zod'
import { IPromotion } from '@/use-cases/promotions/types'
import { EntityValidationError } from '@/utils/error'

export type PromotionValidatedFields = 'text' | 'image' | 'link' | 'isShow' | 'showingOn'

export class PromotionEntityValidationError extends EntityValidationError<PromotionValidatedFields> {}

export const promotionSchema = z.object({
  text: z.string().min(1),
  link: z.string().min(1),
  image: z.string().min(1),
  isShow: z.boolean(),
  showingOn: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  })
})

export class PromotionEntity {
  private id?: string
  private text: string
  private link: string
  private showingOn: string[]
  private image: string
  private isShow: boolean

  constructor({ id, text, link, showingOn, image, isShow }: IPromotion) {
    this.id = id
    this.text = text
    this.link = link
    this.showingOn = showingOn
    this.image = image
    this.isShow = isShow

    this.validate()
  }

  getId() {
    return this.id
  }

  getText() {
    return this.text
  }

  getLink() {
    return this.link
  }

  getShowingOn() {
    return this.showingOn
  }

  getImage() {
    return this.image
  }

  getIsShow() {
    return this.isShow
  }

  private validate() {
    try {
      promotionSchema.parse(this)
    } catch (err) {
      const error = err as ZodError
      const errors = error.flatten().fieldErrors
      throw new PromotionEntityValidationError({
        text: errors.title?.[0],
        link: errors.link?.[0],
        showingOn: errors.showingOn?.[0],
        image: errors.image?.[0],
        isShow: errors.isShow?.[0]
      })
    }
  }
}
