import 'server-only'
import { IService } from '@/use-cases/services/types'
import { prisma } from '@/lib/prisma'

export async function updateService(service: IService): Promise<void> {
  await prisma.service.update({ data: service, where: { id: service.id } })
}
