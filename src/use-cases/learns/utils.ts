import { LearnEntity } from '@/entities/learn'
import { ICreateLearnDto, ILearn } from './types'

export function learnToCreateLearnDtoMapper(learn: LearnEntity): ICreateLearnDto {
  return {
    title: learn.getTitle(),
    description: learn.getDescription(),
    image: learn.getImage(),
    slug: learn.getSlug(),
    level: learn.getLevel(),
    language: learn.getLanguage(),
    isFeatured: learn.getIsNew(),
    isShow: learn.getIsShow()
  }
}

export function learnToDto(learn: LearnEntity): ILearn {
  const learnId = learn.getId()

  if (!learnId) {
    throw new Error('dto: expected learn to have an id')
  }

  return {
    id: learnId,
    title: learn.getTitle(),
    description: learn.getDescription(),
    slug: learn.getSlug(),
    image: learn.getImage(),
    level: learn.getLevel(),
    language: learn.getLanguage(),
    isFeatured: learn.getIsNew(),
    isShow: learn.getIsShow()
  }
}
