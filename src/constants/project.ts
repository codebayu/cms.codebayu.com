import { z } from 'zod'
import { generateRandomString } from '@/utils/functions'

export const projectDefaultValueForm: ICreateProjectDto = {
  slug: generateRandomString(10),
  title: '',
  description: '',
  image: '',
  isFeatured: false,
  isShow: false,
  stacks: [],
  content: '',
  linkDemo: '',
  linkGithub: '',
  updatedAt: new Date()
}

export const stackOptions = [
  {
    id: 'next.js',
    label: 'Next.js'
  },
  {
    id: 'react.js',
    label: 'React.js'
  },
  {
    id: 'nuxt.js',
    label: 'Nuxt.js'
  },
  {
    id: 'vue.js',
    label: 'Vue.js'
  },
  {
    id: 'react-native',
    label: 'React Native'
  },
  {
    id: 'jest',
    label: 'Jest'
  },
  {
    id: 'redux',
    label: 'Redux'
  },
  {
    id: 'react-query',
    label: 'React Query'
  },
  {
    id: 'node-js',
    label: 'Node JS'
  },
  {
    id: 'express.js',
    label: 'Express.js'
  },
  {
    id: 'tailwindcss',
    label: 'TailwindCSS'
  },
  {
    id: 'material-ui',
    label: 'Material UI'
  },
  {
    id: 'bootstrap',
    label: 'Bootstrap'
  },
  {
    id: 'chakraui',
    label: 'ChakraUI'
  },
  {
    id: 'firebase',
    label: 'Firebase'
  },
  {
    id: 'postgresql',
    label: 'PostgreSql'
  },
  {
    id: 'prisma',
    label: 'Prisma'
  },
  {
    id: 'sass',
    label: 'SASS'
  },
  {
    id: 'javascript',
    label: 'JavaScript'
  },
  {
    id: 'typescript',
    label: 'TypeScript'
  },
  {
    id: 'html',
    label: 'HTML'
  },
  {
    id: 'css',
    label: 'CSS'
  }
] as const

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
  updatedAt: Date
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
  updatedAt: Date
}

export type CreateProject = (project: ICreateProjectDto) => void
export type DeleteProject = (projectId: string) => void
export type UpdateProject = (project: IProject) => void
export type GetProject = (projectId: string) => Promise<IProject>

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  isFeatured: z.boolean(),
  isShow: z.boolean(),
  slug: z.string().min(1),
  content: z.string().min(1),
  linkDemo: z.string().min(1),
  linkGithub: z.string().min(1),
  stacks: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  }),
  updatedAt: z.date()
})
