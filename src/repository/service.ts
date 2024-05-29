import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class ServiceRepository {
  protected prisma = prisma

  get collection() {
    return this.prisma.service
  }

  async findMany(args: Prisma.ServiceFindManyArgs) {
    const data = await this.collection.findMany(args)
    return data
  }

  async count() {
    const count = await this.collection.count()
    return count
  }

  async create(args: Prisma.ServiceCreateArgs) {
    const data = await this.collection.create(args)
    return data
  }

  async update(args: Prisma.ServiceUpdateArgs) {
    const data = await this.collection.update(args)
    return data
  }

  async delete(args: Prisma.ServiceDeleteArgs) {
    const data = await this.collection.delete(args)
    return data
  }
}
