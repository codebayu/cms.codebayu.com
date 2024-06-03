import { z } from 'zod'

export type IUser = {
  id: string
  name: string
  email: string
}

export type User = {
  userId: string
}

export type GetUser = () => User | undefined

export const loginSchema = z.object({
  email: z.string().min(5).email(),
  password: z.string().min(5)
})
