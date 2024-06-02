import { ITEM_PER_PAGE } from '@/constants'
import { ProjectRepository } from '@/repository/project'
import { Prisma } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { checkPermission } from '@/lib/auth'
import { PrismaError } from '@/utils/error'

type ExpludeField = 'createdAt'
type ProjectCreateInput = Omit<Prisma.ProjectCreateInput, ExpludeField>
type ProjectUncheckedCreateInput = Omit<Prisma.ProjectUncheckedCreateInput, ExpludeField>

export class ProjectUseCase {
  private readonly repository: ProjectRepository

  constructor() {
    this.repository = new ProjectRepository()
  }

  async getAllProject({ page }: { page: number }) {
    try {
      const offset = (page - 1) * ITEM_PER_PAGE
      const projects = await this.repository.findMany({
        skip: offset,
        take: ITEM_PER_PAGE,
        orderBy: { createdAt: 'desc' }
      })
      return projects
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async getTotalProject() {
    try {
      const count = await this.repository.count()
      return count
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async createProject(project: Prisma.XOR<ProjectCreateInput, ProjectUncheckedCreateInput>) {
    await checkPermission()
    try {
      const data = await this.repository.create({ data: { ...project, createdAt: new Date() } })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async updateProject(project: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>) {
    await checkPermission()

    if (typeof project.id !== 'string') {
      throw new Error('use-case: expected product to have an id of type string')
    }

    try {
      const data = await this.repository.update({
        where: { id: project.id },
        data: project
      })
      return data
    } catch (err) {
      const error = err as PrismaClientKnownRequestError
      throw new PrismaError(error.code)
    }
  }

  async deleteProject(id: string) {
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
