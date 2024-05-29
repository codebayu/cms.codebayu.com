import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class LearnRepository {
  protected prisma = prisma

  get collection() {
    return this.prisma.learn
  }

  async findMany(args: Prisma.LearnFindManyArgs) {
    const data = await this.collection.findMany(args)
    return data
  }

  async count() {
    const count = await this.collection.count()
    return count
  }

  async create(args: Prisma.LearnCreateArgs) {
    const data = await this.collection.create(args)
    return data
  }

  async update(args: Prisma.LearnUpdateArgs) {
    const data = await this.collection.update(args)
    return data
  }

  async delete(args: Prisma.LearnDeleteArgs) {
    const data = await this.collection.delete(args)
    return data
  }
}
