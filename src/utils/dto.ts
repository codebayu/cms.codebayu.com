import { ICareer } from '@/use-cases/careers/types'
import { ILearn } from '@/use-cases/learns/types'
import { IProject } from '@/use-cases/projects/types'
import { IPromotion } from '@/use-cases/promotions/types'
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

export function toProjectDtoMapper(project: IProject) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    content: project.content,
    slug: project.slug,
    isFeatured: project.isFeatured,
    isShow: project.isShow,
    stacks: project.stacks,
    updatedAt: project.updatedAt,
    linkDemo: project.linkDemo,
    linkGithub: project.linkGithub
  }
}

export function toPromotionDtoMapper(project: IPromotion) {
  return {
    id: project.id,
    text: project.text,
    image: project.image,
    isShow: project.isShow,
    link: project.link,
    showingOn: project.showingOn
  }
}
