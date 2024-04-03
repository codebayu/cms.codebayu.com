import 'server-only'
import { IUser } from '@/use-cases/users/types'
import { prisma } from '@/lib/prisma'

export function toUserDtoMapper(user: IUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export async function getUsers(): Promise<IUser[]> {
  const users = await prisma.user.findMany({ take: 10 })
  return users.map(toUserDtoMapper)
}
