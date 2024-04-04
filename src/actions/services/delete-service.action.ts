'use server'

import { revalidatePath } from 'next/cache'
import { deleteServiceUseCase } from '@/use-cases/services/delete-service.use-case'
import { deleteService } from '@/data-access/services/delete-service.persistence'
import { auth } from '@/lib/auth'

export async function deleteServiceAction(serviceId: string) {
  const { getUser } = await auth()
  await deleteServiceUseCase({ getUser, deleteService }, { serviceId })
  revalidatePath('/service')
}
