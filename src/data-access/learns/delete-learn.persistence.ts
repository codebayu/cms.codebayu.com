import 'server-only'
import { prisma } from '@/lib/prisma'

export async function deleteLearn(itemId: string): Promise<void> {
  await prisma.learn.delete({ where: { id: itemId } })
}
