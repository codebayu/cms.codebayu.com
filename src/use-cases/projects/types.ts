export type IProject = {
  id?: string
  title: string
  slug: string
  description: string
  image: string
  linkDemo: string
  linkGithub: string
  stacks: string[]
  isShow: boolean
  updatedAt?: Date
  content: string
  isFeatured: boolean
}

export type ICreateProjectDto = {
  title: string
  slug: string
  description: string
  image: string
  linkDemo: string
  linkGithub: string
  stacks: string[]
  isShow: boolean
  content: string
  isFeatured: boolean
  updatedAt?: Date
}

export type CreateProject = (project: ICreateProjectDto) => void
export type DeleteProject = (projectId: string) => void
export type UpdateProject = (project: IProject) => void
export type GetProject = (projectId: string) => Promise<IProject>
