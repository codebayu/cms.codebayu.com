'use server';
import { revalidatePath } from 'next/cache';
import { deleteService } from '@/data-access/services/delete-service.persistence';
import { auth } from '@/lib/auth';
import { deleteServiceUseCase } from '@/use-cases/services/delete-service.use-case';

export async function deleteServiceAction(serviceId: string) {
  const { getUser } = await auth()
  await deleteServiceUseCase({ getUser, deleteService }, { serviceId })
  revalidatePath('/service')
}
