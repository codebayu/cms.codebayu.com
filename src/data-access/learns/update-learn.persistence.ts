import 'server-only'
import { ILearn } from '@/use-cases/learns/types'
import { prisma } from '@/lib/prisma'

export async function updateLearn(learn: ILearn): Promise<void> {
  await prisma.learn.update({ data: learn, where: { id: learn.id } })
}
