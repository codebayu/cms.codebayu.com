import 'server-only'
import { IProject } from '@/use-cases/projects/types'
import { prisma } from '@/lib/prisma'
import { toProjectDtoMapper } from '@/utils/dto'

export async function getProjects(): Promise<IProject[]> {
  const projects = await prisma.project.findMany({ take: 10 })
  return projects.map(project => toProjectDtoMapper(project))
}
