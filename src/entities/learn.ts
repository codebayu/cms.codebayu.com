import { ZodError, z } from 'zod'
import { ILearn } from '@/use-cases/learns/types'
import { EntityValidationError } from '@/utils/error'

export type LearnValidatedFields =
  | 'title'
  | 'description'
  | 'slug'
  | 'image'
  | 'level'
  | 'language'
  | 'isFeatured'
  | 'isShow'

export class LearnEntityValidationError extends EntityValidationError<LearnValidatedFields> {}

export const learnSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().min(1),
  level: z.string().min(1),
  language: z.string().min(1),
  isFeatured: z.boolean(),
  isShow: z.boolean()
})

export class LearnEntity {
  private id?: string
  private title: string
  private description: string
  private slug: string
  private image: string
  private level: string
  private language: string
  private isFeatured: boolean
  private isShow: boolean

  constructor({ id, title, description, slug, image, level, language, isFeatured, isShow }: ILearn) {
    this.id = id
    this.title = title
    this.description = description
    this.slug = slug
    this.image = image
    this.level = level
    this.language = language
    this.isFeatured = isFeatured
    this.isShow = isShow

    this.validate()
  }

  getId() {
    return this.id
  }

  getTitle() {
    return this.title
  }

  getDescription() {
    return this.description
  }

  getSlug() {
    return this.slug
  }

  getImage() {
    return this.image
  }

  getLevel() {
    return this.level
  }

  getLanguage() {
    return this.language
  }

  getIsNew() {
    return this.isFeatured
  }

  getIsShow() {
    return this.isShow
  }

  private validate() {
    try {
      learnSchema.parse(this)
    } catch (err) {
      const error = err as ZodError
      const errors = error.flatten().fieldErrors
      throw new LearnEntityValidationError({
        title: errors.title?.[0],
        description: errors.description?.[0],
        slug: errors.slug?.[0],
        image: errors.image?.[0],
        level: errors.level?.[0],
        language: errors.language?.[0],
        isFeatured: errors.isFeatured?.[0],
        isShow: errors.isShow?.[0]
      })
    }
  }
}
