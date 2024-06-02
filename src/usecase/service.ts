import { ITEM_PER_PAGE } from '@/constants'
import { ServiceRepository } from '@/repository/service'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

type ExpludeField = 'createdAt'
type ServiceCreateInput = Omit<Prisma.ServiceCreateInput, ExpludeField>
type ServiceUncheckedCreateInput = Omit<Prisma.ServiceUncheckedCreateInput, ExpludeField>

export class ServiceUseCase {
  private readonly repository: ServiceRepository

  constructor() {
    this.repository = new ServiceRepository()
  }

  async getAllService({ page }: { page: number }) {
    try {
      const offset = (page - 1) * ITEM_PER_PAGE
      const services = await this.repository.findMany({
        skip: offset,
        take: ITEM_PER_PAGE,
        orderBy: { createdAt: 'desc' }
      })
      return services
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getTotalService() {
    try {
      const count = await this.repository.count()
      return count
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async createService(service: Prisma.XOR<ServiceCreateInput, ServiceUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: { ...service, createdAt: new Date() } })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updateService(service: Prisma.XOR<Prisma.ServiceUpdateInput, Prisma.ServiceUncheckedUpdateInput>) {
    await checkPermission()

    if (typeof service.id !== 'string') {
      throw new Error('use-case: expected product to have an id of type string')
    }

    try {
      const data = await this.repository.update({
        where: { id: service.id },
        data: service
      })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async deleteService(id: string) {
    await checkPermission()
    try {
      const data = await this.repository.delete({ where: { id } })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }
}
