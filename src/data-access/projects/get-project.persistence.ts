import 'server-only'
import { IProject } from '@/use-cases/projects/types'
import { prisma } from '@/lib/prisma'
import { toProjectDtoMapper } from '@/utils/dto'

export async function getProject(itemId: string): Promise<IProject> {
  const project = await prisma.project.findFirst({ where: { id: itemId } })
  if (!project) {
    throw new Error('data-access: no project found')
  }
  return toProjectDtoMapper(project)
}
