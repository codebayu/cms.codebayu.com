import { ITEM_PER_PAGE } from '@/constants'
import { LearnRepository } from '@/repository/learn'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

export class LearnUseCase {
  private readonly repository: LearnRepository

  constructor() {
    this.repository = new LearnRepository()
  }

  async getAllLearn({ page }: { page: number }) {
    try {
      const offset = (page - 1) * ITEM_PER_PAGE
      const learns = await this.repository.findMany({
        skip: offset,
        take: ITEM_PER_PAGE
      })
      return learns
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getTotalLearn() {
    try {
      const count = await this.repository.count()
      return count
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async createLearn(career: Prisma.XOR<Prisma.LearnCreateInput, Prisma.LearnUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: career })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updateLearn(career: Prisma.XOR<Prisma.LearnUpdateInput, Prisma.LearnUncheckedUpdateInput>) {
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

  async deleteLearn(id: string) {
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
