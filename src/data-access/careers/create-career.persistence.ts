import 'server-only'
import { ICreateCareerDto } from '@/use-cases/careers/types'
import { prisma } from '@/lib/prisma'

export async function createCareer(career: ICreateCareerDto): Promise<void> {
  await prisma.career.create({ data: career })
}
