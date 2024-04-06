import { ICareer } from '@/use-cases/careers/types'
import { ILearn } from '@/use-cases/learns/types'
import { IService } from '@/use-cases/services/types'

export function toCareerDtoMapper(career: ICareer) {
  return {
    id: career.id,
    position: career.position,
    company: career.company,
    logo: career.logo,
    location: career.location,
    locationType: career.locationType,
    type: career.type,
    startDate: career.startDate,
    endDate: career.endDate,
    link: career.link,
    slug: career.slug
  }
}

export function toServiceDtoMapper(service: IService) {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    tag: service.tag
  }
}

export function toLearnDtoMapper(learn: ILearn) {
  return {
    id: learn.id,
    title: learn.title,
    description: learn.description,
    image: learn.image,
    slug: learn.slug,
    level: learn.level,
    language: learn.language,
    isFeatured: learn.isFeatured,
    isShow: learn.isShow
  }
}
