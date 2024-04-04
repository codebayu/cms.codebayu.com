import 'server-only'
import { ILearn } from '@/use-cases/learns/types'
import { prisma } from '@/lib/prisma'
import { toLearnDtoMapper } from '@/utils/dto'

export async function getLearns(): Promise<ILearn[]> {
  const careers = await prisma.learn.findMany({ take: 10 })
  return careers.map(toLearnDtoMapper)
}
