import { ZodError, z } from 'zod'
import { IProject } from '@/use-cases/projects/types'
import { EntityValidationError } from '@/utils/error'

export type ProjectValidatedFields =
  | 'title'
  | 'description'
  | 'image'
  | 'isFeatured'
  | 'isShow'
  | 'slug'
  | 'stacks'
  | 'updatedAt'
  | 'content'
  | 'linkDemo'
  | 'linkGithub'
  | 'updatedAt'
  | 'content'
  | 'linkDemo'
  | 'linkGithub'

export class ProjectEntityValidationError extends EntityValidationError<ProjectValidatedFields> {}

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  isFeatured: z.boolean(),
  isShow: z.boolean(),
  slug: z.string().min(1),
  content: z.string().min(1),
  linkDemo: z.string().min(1),
  linkGithub: z.string().min(1),
  stacks: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  }),
  updatedAt: z.date()
})

export class ProjectEntity {
  private id?: string
  private title: string
  private description: string
  private image: string
  private isFeatured: boolean
  private isShow: boolean
  private slug: string
  private stacks: string[]
  private updatedAt: Date
  private content: string
  private linkDemo: string
  private linkGithub: string

  constructor({
    id,
    title,
    description,
    image,
    isFeatured,
    isShow,
    slug,
    stacks,
    updatedAt,
    content,
    linkDemo,
    linkGithub
  }: IProject) {
    this.id = id
    this.title = title
    this.description = description
    this.content = content
    this.image = image
    this.isFeatured = isFeatured
    this.isShow = isShow
    this.slug = slug
    this.stacks = stacks
    this.updatedAt = updatedAt
    this.linkDemo = linkDemo
    this.linkGithub = linkGithub

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

  getContent() {
    return this.content
  }

  getImage() {
    return this.image
  }

  getIsFeatured() {
    return this.isFeatured
  }

  getIsShow() {
    return this.isShow
  }

  getSlug() {
    return this.slug
  }

  getStacks() {
    return this.stacks
  }

  getUpdatedAt() {
    return this.updatedAt
  }

  getLinkDemo() {
    return this.linkDemo
  }

  getLinkGithub() {
    return this.linkGithub
  }

  private validate() {
    try {
      projectSchema.parse(this)
    } catch (err) {
      const error = err as ZodError
      const errors = error.flatten().fieldErrors
      throw new ProjectEntityValidationError({
        title: errors.title?.[0],
        description: errors.description?.[0],
        image: errors.image?.[0],
        isFeatured: errors.isFeatured?.[0],
        isShow: errors.isShow?.[0],
        slug: errors.slug?.[0],
        stacks: errors.stacks?.[0],
        updatedAt: errors.updatedAt?.[0],
        content: errors.content?.[0],
        linkDemo: errors.linkDemo?.[0],
        linkGithub: errors.linkGithub?.[0]
      })
    }
  }
}
