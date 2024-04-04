import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { serviceSchema } from '@/entities/service'
import { ICreateServiceDto, IService } from '@/use-cases/services/types'
import { createServiceAction } from '@/actions/services/create-service.action'
import { updateServiceAction } from '@/actions/services/update-service.action'
import { useFormStore } from '@/stores/form'
import { serviceDefaultValueForm } from '@/constants/service'
import { useToast } from '@/components/ui/use-toast'

type FormValues = z.infer<typeof serviceSchema>

export default function useServiceForm() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const { formType, defaultValueForm } = useFormStore<IService>()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: serviceDefaultValueForm,
    values: defaultValueForm
  })

  async function onSubmit(data: ICreateServiceDto) {
    startTransition(async () => {
      if (formType === 'create') {
        await onCreateAction(data)
        return
      }
      await onUpdateAction(data)
    })
  }

  async function onCreateAction(values: FormValues) {
    const result = await createServiceAction(values)
    if (result.status === 'error') {
      toast({ title: result.status, description: result.errors })
      return
    }
    form.reset()
    toast({
      title: 'Success!',
      description: `You have successfully created a new service.`
    })
  }

  async function onUpdateAction(values: FormValues) {
    const result = await updateServiceAction({
      ...values,
      id: defaultValueForm.id
    })
    if (result.status === 'error') {
      toast({ title: result.status, description: result.errors })
      return
    }
    toast({
      title: 'Success!',
      description: `You have successfully update the service.`
    })
  }

  const copyButtonIdle = formType === 'create' ? 'Create' : 'Update'
  const copyButtonSubmitting = formType === 'create' ? 'Creating new service...' : 'Updating service...'

  return { form, formType, formRef, isPending, onSubmit, copyButtonIdle, copyButtonSubmitting, defaultValueForm }
}
