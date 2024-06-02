import { z } from 'zod'

export const serviceDefaultValueForm = {
  title: '',
  description: '',
  tag: '',
  createdAt: new Date(),
  updatedAt: null
}

export type IService = {
  id?: string
  title: string
  description: string
  tag: string
  createdAt: Date
  updatedAt: Date | null
}

export type IServicePayloadCreate = {
  title: string
  description: string
  tag: string
}

export type IServicePayloadUpdate = { id: string } & IServicePayloadCreate

export const serviceSchema = z.object({
  tag: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1)
})
