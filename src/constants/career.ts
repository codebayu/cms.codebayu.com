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
  slug: generateRandomString(10)
}
