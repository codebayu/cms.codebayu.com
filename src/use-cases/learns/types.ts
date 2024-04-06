export type ILearn = {
  id?: string
  title: string
  description: string
  image: string
  slug: string
  level: string
  language: string
  isFeatured: boolean
  isShow: boolean
}

export type ICreateLearnDto = {
  title: string
  description: string
  image: string
  slug: string
  level: string
  language: string
  isFeatured: boolean
  isShow: boolean
}

export type CreateLearn = (learn: ICreateLearnDto) => void
export type DeleteLearn = (learnId: string) => void
export type UpdateLearn = (learn: ILearn) => void
export type GetLearn = (learnId: string) => Promise<ILearn>
