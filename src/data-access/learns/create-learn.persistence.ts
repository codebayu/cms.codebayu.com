import 'server-only'
import { ICreateLearnDto } from '@/use-cases/learns/types'
import { prisma } from '@/lib/prisma'

export async function createLearn(learn: ICreateLearnDto): Promise<void> {
  await prisma.learn.create({ data: learn })
}
