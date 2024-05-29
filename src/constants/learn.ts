import { z } from 'zod'
import { generateRandomString } from '@/utils/functions'

export const learnDefaultValueForm: ICreateLearnDto = {
  title: '',
  description: '',
  image: '',
  language: 'typescript',
  level: 'easy',
  slug: generateRandomString(10),
  isFeatured: false,
  isShow: false
}

export const levelOptions = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' }
]

export const languageOptions = [
  { label: 'Javascript', value: 'javascript' },
  { label: 'Typescript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'c#' },
  { label: 'PHP', value: 'php#' }
]

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
