import 'server-only'
import { ICareer } from '@/use-cases/careers/types'
import { prisma } from '@/lib/prisma'

export async function updateCareer(career: ICareer): Promise<void> {
  await prisma.career.update({ data: career, where: { id: career.id } })
}
