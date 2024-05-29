import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PromotionRepository {
  protected prisma = prisma

  get collection() {
    return this.prisma.promotion
  }

  async findMany(args: Prisma.PromotionFindManyArgs) {
    const data = await this.collection.findMany(args)
    return data
  }

  async count() {
    const count = await this.collection.count()
    return count
  }

  async create(args: Prisma.PromotionCreateArgs) {
    const data = await this.collection.create(args)
    return data
  }

  async update(args: Prisma.PromotionUpdateArgs) {
    const data = await this.collection.update(args)
    return data
  }

  async delete(args: Prisma.PromotionDeleteArgs) {
    const data = await this.collection.delete(args)
    return data
  }
}
