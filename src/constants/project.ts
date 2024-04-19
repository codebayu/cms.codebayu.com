import { ICreateProjectDto } from '@/use-cases/projects/types'
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
  linkGithub: ''
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
