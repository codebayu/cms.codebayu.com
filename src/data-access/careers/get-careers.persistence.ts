import 'server-only'
import { ICareer } from '@/use-cases/careers/types'
import { prisma } from '@/lib/prisma'
import { toCareerDtoMapper } from '@/utils/dto'

export async function getCareers(): Promise<ICareer[]> {
  const careers = await prisma.career.findMany({ take: 10 })
  return careers.map(toCareerDtoMapper)
}
