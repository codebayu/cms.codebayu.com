import { ITEM_PER_PAGE } from '@/constants'
import { ServiceRepository } from '@/repository/service'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

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
        take: ITEM_PER_PAGE
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

  async createService(career: Prisma.XOR<Prisma.ServiceCreateInput, Prisma.ServiceUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: career })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updateService(career: Prisma.XOR<Prisma.ServiceUpdateInput, Prisma.ServiceUncheckedUpdateInput>) {
    await checkPermission()

    if (typeof career.id !== 'string') {
      throw new Error('use-case: expected product to have an id of type string')
    }

    try {
      const data = await this.repository.update({
        where: { id: career.id },
        data: career
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
