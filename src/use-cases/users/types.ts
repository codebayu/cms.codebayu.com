export type IUser = {
  id: string
  name: string
  email: string
}

export type User = {
  userId: string
}

export type GetUser = () => User | undefined
