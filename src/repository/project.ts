import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class ProjectRepository {
  protected prisma = prisma

  get collection() {
    return this.prisma.project
  }

  async findMany(args: Prisma.ProjectFindManyArgs) {
    const data = await this.collection.findMany(args)
    return data
  }

  async count() {
    const count = await this.collection.count()
    return count
  }

  async create(args: Prisma.ProjectCreateArgs) {
    const data = await this.collection.create(args)
    return data
  }

  async update(args: Prisma.ProjectUpdateArgs) {
    const data = await this.collection.update(args)
    return data
  }

  async delete(args: Prisma.ProjectDeleteArgs) {
    const data = await this.collection.delete(args)
    return data
  }
}
