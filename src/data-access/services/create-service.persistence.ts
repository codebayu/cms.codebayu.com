import 'server-only'
import { ICreateServiceDto } from '@/use-cases/services/types'
import { prisma } from '@/lib/prisma'

export async function createService(service: ICreateServiceDto): Promise<void> {
  await prisma.service.create({ data: service })
}
