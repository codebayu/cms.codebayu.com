import { ITEM_PER_PAGE } from '@/constants'
import { CareerRepository } from '@/repository/career'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

export class CareerUseCase {
  private readonly repository: CareerRepository

  constructor() {
    this.repository = new CareerRepository()
  }

  async getAllCareer({ page }: { page: number }) {
    try {
      const offset = (page - 1) * ITEM_PER_PAGE
      const careers = await this.repository.findMany({
        skip: offset,
        take: ITEM_PER_PAGE
      })
      return careers
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getCareerById(id: string) {
    try {
      const career = await this.repository.findUnique({ where: { id } })
      return career
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getTotalCareer() {
    try {
      const count = await this.repository.count()
      return count
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async createCareer(career: Prisma.XOR<Prisma.CareerCreateInput, Prisma.CareerUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: career })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updateCareer(career: Prisma.XOR<Prisma.CareerUpdateInput, Prisma.CareerUncheckedUpdateInput>) {
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

  async deleteCareer(id: string) {
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
