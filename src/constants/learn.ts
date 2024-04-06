import { ICreateLearnDto } from '@/use-cases/learns/types'
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
