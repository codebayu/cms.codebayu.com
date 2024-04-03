import 'server-only'
import { IService } from '@/use-cases/services/types'
import { prisma } from '@/lib/prisma'
import { toServiceDtoMapper } from '@/utils/dto'

export async function getService(itemId: string): Promise<IService> {
  const service = await prisma.service.findFirst({ where: { id: itemId } })
  if (!service) {
    throw new Error('data-access: no service found')
  }
  return toServiceDtoMapper(service)
}
