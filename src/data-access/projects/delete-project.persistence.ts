import 'server-only'
import { prisma } from '@/lib/prisma'

export async function deleteProject(itemId: string): Promise<void> {
  await prisma.project.delete({ where: { id: itemId } })
}
