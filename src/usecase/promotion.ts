import { ITEM_PER_PAGE } from '@/constants'
import { PromotionRepository } from '@/repository/promotion'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

export class PromotionUseCase {
  private readonly repository: PromotionRepository

  constructor() {
    this.repository = new PromotionRepository()
  }

  async getAllPromotion({ page }: { page: number }) {
    try {
      const offset = (page - 1) * ITEM_PER_PAGE
      const promotions = await this.repository.findMany({
        skip: offset,
        take: ITEM_PER_PAGE
      })
      return promotions
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getPromotionById(id: string) {
    try {
      const promotion = await this.repository.findUnique({ where: { id } })
      return promotion
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getTotalPromotion() {
    try {
      const count = await this.repository.count()
      return count
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async createPromotion(career: Prisma.XOR<Prisma.PromotionCreateInput, Prisma.PromotionUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: career })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updatePromotion(career: Prisma.XOR<Prisma.PromotionUpdateInput, Prisma.PromotionUncheckedUpdateInput>) {
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

  async deletePromotion(id: string) {
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
