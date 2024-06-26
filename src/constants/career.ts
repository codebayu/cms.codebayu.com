import { z } from 'zod'
import { generateRandomString } from '@/utils/functions'

export const locationsTypeOptions = [
  { label: 'On-site', value: 'on-site' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' }
]

export const typeOptions = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
  { label: 'Freelance', value: 'freelance' }
]

export const careerDefaultValueForm = {
  position: '',
  company: '',
  link: '',
  location: '',
  locationType: 'on-site',
  type: 'full-time',
  startDate: new Date(),
  endDate: null,
  logo: '',
  slug: generateRandomString(10),
  createdAt: new Date(),
  updatedAt: null
}

export type ICareer = {
  id?: string
  position: string
  company: string
  logo: string
  location: string
  locationType: string
  type: string
  startDate: Date
  endDate: Date | null
  link: string
  slug: string
  createdAt: Date
  updatedAt: Date | null
}

export type ICareerPayloadCreate = {
  position: string
  company: string
  logo: string
  location: string
  locationType: string
  type: string
  startDate: Date
  endDate: Date | null
  link: string
  slug: string
}

export type ICareerPayloadUpdate = { id: string } & ICareerPayloadCreate

export const careerSchema = z.object({
  position: z.string().min(1),
  company: z.string().min(1),
  logo: z.string().min(1),
  location: z.string().min(1),
  locationType: z.string().min(1),
  type: z.string().min(1),
  startDate: z.date(),
  endDate: z.date().nullable(),
  link: z.string().min(1),
  slug: z.string().min(1)
})
