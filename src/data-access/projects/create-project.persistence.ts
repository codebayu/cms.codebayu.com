import 'server-only'
import { ICreateProjectDto } from '@/use-cases/projects/types'
import { prisma } from '@/lib/prisma'

export async function createProject(project: ICreateProjectDto): Promise<void> {
  await prisma.project.create({ data: project })
}
