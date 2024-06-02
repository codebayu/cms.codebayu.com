import { ITEM_PER_PAGE } from '@/constants'
import { PromotionRepository } from '@/repository/promotion'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

type ExpludeField = 'createdAt'
type PromotionCreateInput = Omit<Prisma.PromotionCreateInput, ExpludeField>
type PromotionUncheckedCreateInput = Omit<Prisma.PromotionUncheckedCreateInput, ExpludeField>

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
        take: ITEM_PER_PAGE,
        orderBy: { createdAt: 'desc' }
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

  async createPromotion(promotion: Prisma.XOR<PromotionCreateInput, PromotionUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: { ...promotion, createdAt: new Date() } })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updatePromotion(promotion: Prisma.XOR<Prisma.PromotionUpdateInput, Prisma.PromotionUncheckedUpdateInput>) {
    await checkPermission()

    if (typeof promotion.id !== 'string') {
      throw new Error('use-case: expected product to have an id of type string')
    }

    try {
      const data = await this.repository.update({
        where: { id: promotion.id },
        data: promotion
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
