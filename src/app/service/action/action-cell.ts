'use server'

import { revalidatePath } from 'next/cache'
import { ServiceUseCase } from '@/usecase/service'

export async function deleteServiceAction(careerId: string) {
  const usecase = new ServiceUseCase()
  await usecase.deleteService(careerId)
  revalidatePath('/service')
}
