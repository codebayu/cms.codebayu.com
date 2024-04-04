import 'server-only'
import { ILearn } from '@/use-cases/learns/types'
import { prisma } from '@/lib/prisma'
import { toLearnDtoMapper } from '@/utils/dto'

export async function getLearn(itemId: string): Promise<ILearn> {
  const learn = await prisma.learn.findFirst({ where: { id: itemId } })
  if (!learn) {
    throw new Error('data-access: no learn found')
  }
  return toLearnDtoMapper(learn)
}
