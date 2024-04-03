'use server'

import { revalidatePath } from 'next/cache'
import { createCareerUseCase } from '@/use-cases/careers/create-career.use-case'
import { ICreateCareerDto } from '@/use-cases/careers/types'
import { createCareer } from '@/data-access/careers/create-career.persistence'
import { auth } from '@/lib/auth'
import { CreateItemState } from '@/types/actions'
import { ValidationError } from '@/utils/error'

export async function createCareerAction(formData: ICreateCareerDto): Promise<CreateItemState<ICreateCareerDto>> {
  const { getUser } = await auth()
  try {
    await createCareerUseCase({ getUser, createCareer }, { ...formData })
    revalidatePath('/career')
    return {
      form: {
        position: '',
        company: '',
        link: '',
        location: '',
        locationType: 'on-site',
        type: 'full-time',
        startDate: new Date(),
        endDate: new Date(),
        logo: '',
        slug: ''
      },
      status: 'success'
    }
  } catch (err) {
    const error = err as Error
    if (error instanceof ValidationError) {
      return {
        form: formData,
        status: 'field-errors',
        errors: error.getErrors()
      }
    } else {
      return {
        form: formData,
        status: 'error',
        errors: error.message
      }
    }
  }
}
