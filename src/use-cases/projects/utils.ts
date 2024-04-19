import { ProjectEntity } from '@/entities/project'
import { ICreateProjectDto, IProject } from './types'

export function projectToCreateProjectDtoMapper(project: ProjectEntity): ICreateProjectDto {
  return {
    title: project.getTitle(),
    slug: project.getSlug(),
    description: project.getDescription(),
    image: project.getImage(),
    linkDemo: project.getLinkDemo(),
    linkGithub: project.getLinkGithub(),
    stacks: project.getStacks(),
    isShow: project.getIsShow(),
    content: project.getContent(),
    isFeatured: project.getIsFeatured(),
    updatedAt: project.getUpdatedAt()
  }
}

export function projectToDto(project: ProjectEntity): IProject {
  const projectId = project.getId()

  if (!projectId) {
    throw new Error('dto: expected project to have an id')
  }

  return {
    id: projectId,
    title: project.getTitle(),
    slug: project.getSlug(),
    description: project.getDescription(),
    image: project.getImage(),
    linkDemo: project.getLinkDemo(),
    linkGithub: project.getLinkGithub(),
    stacks: project.getStacks(),
    isShow: project.getIsShow(),
    updatedAt: project.getUpdatedAt(),
    content: project.getContent(),
    isFeatured: project.getIsFeatured()
  }
}
