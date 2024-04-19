import 'server-only'
import { IProject } from '@/use-cases/projects/types'
import { prisma } from '@/lib/prisma'

export async function updateProject(project: IProject): Promise<void> {
  await prisma.project.update({ data: project, where: { id: project.id } })
}
