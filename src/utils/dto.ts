import { ICareer } from '@/use-cases/careers/types'
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
