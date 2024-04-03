import { ZodError, z } from 'zod'
import { ICareer } from '@/use-cases/careers/types'
import { EntityValidationError } from './utils'

type ValidatedFields =
  | 'position'
  | 'company'
  | 'logo'
  | 'location'
  | 'locationType'
  | 'type'
  | 'startDate'
  | 'endDate'
  | 'link'

export class CareerEntityValidationError extends EntityValidationError<ValidatedFields> {}

export const careerSchema = z.object({
  position: z.string().min(1),
  company: z.string().min(1),
  logo: z.string().min(1),
  location: z.string().min(1),
  locationType: z.string().min(1),
  type: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  link: z.string().min(1)
})

export class CareerEntity {
  private id?: string
  private position: string
  private company: string
  private logo: string
  private location: string
  private locationType: string
  private type: string
  private startDate: Date
  private endDate: Date
  private link: string
  private slug: string

  constructor({ id, position, company, logo, location, locationType, type, startDate, endDate, link, slug }: ICareer) {
    this.id = id
    this.position = position
    this.company = company
    this.logo = logo
    this.location = location
    this.locationType = locationType
    this.type = type
    this.startDate = startDate
    this.endDate = endDate
    this.link = link
    this.slug = slug

    this.validate()
  }

  getId() {
    return this.id
  }

  getPosition() {
    return this.position
  }

  getCompany() {
    return this.company
  }

  getLogo() {
    return this.logo
  }

  getLocation() {
    return this.location
  }

  getLocationType() {
    return this.locationType
  }

  getType() {
    return this.type
  }

  getStartDate() {
    return this.startDate
  }

  getEndDate() {
    return this.endDate
  }

  getLink() {
    return this.link
  }

  getSlug() {
    return this.slug
  }

  private validate() {
    try {
      careerSchema.parse(this)
    } catch (err) {
      const error = err as ZodError
      const errors = error.flatten().fieldErrors
      throw new CareerEntityValidationError({
        position: errors.position?.[0],
        company: errors.company?.[0],
        logo: errors.logo?.[0],
        location: errors.location?.[0],
        locationType: errors.locationType?.[0],
        type: errors.type?.[0],
        startDate: errors.startDate?.[0],
        endDate: errors.endDate?.[0],
        link: errors.link?.[0]
      })
    }
  }
}
