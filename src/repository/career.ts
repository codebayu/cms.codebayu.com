import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class CareerRepository {
  protected prisma = prisma

  get collection() {
    return this.prisma.career
  }

  async findMany(args: Prisma.CareerFindManyArgs) {
    const data = await this.collection.findMany(args)
    return data
  }

  async findUnique(args: Prisma.CareerFindUniqueArgs) {
    const data = await this.collection.findUnique(args)
    return data
  }

  async count() {
    const count = await this.collection.count()
    return count
  }

  async create(args: Prisma.CareerCreateArgs) {
    const data = await this.collection.create(args)
    return data
  }

  async update(args: Prisma.CareerUpdateArgs) {
    const data = await this.collection.update(args)
    return data
  }

  async delete(args: Prisma.CareerDeleteArgs) {
    const data = await this.collection.delete(args)
    return data
  }
}
