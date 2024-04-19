import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useTransition } from 'react'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'
import { ZodSchema } from 'zod'
import { useDialogStore } from '@/stores/dialog'
import { useFormStore } from '@/stores/form'
import { CreateItemState, WithId } from '@/types/actions'
import { useToast } from '@/components/ui/use-toast'

interface ActionFormDependencies<T, D> {
  title: string
  schema: ZodSchema<D>
  defaultValue: DefaultValues<T & FieldValues>
  createAction: (data: T) => Promise<CreateItemState<T>>
  updateAction: (data: T & { id: string }) => Promise<CreateItemState<T>>
}

export default function useActionForm<T, D>({
  title,
  schema,
  defaultValue,
  createAction,
  updateAction
}: ActionFormDependencies<T, D>) {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const { formType, defaultValueForm } = useFormStore<WithId<T>>()
  const { hideDialog } = useDialogStore()
  const [isPending, startTransition] = useTransition()

  const form = useForm<T & FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
    values: defaultValueForm
  })

  const copyButtonIdle = formType === 'create' ? 'Create' : 'Update'
  const copyButtonSubmitting = formType === 'create' ? `Creating new ${title}...` : `Updating ${title}...`

  async function onSubmit(data: T | WithId<T>) {
    startTransition(async () => {
      if (formType === 'create') {
        await onCreateAction(data)
        return
      }
      await onUpdateAction(data as WithId<T>)
    })
  }

  async function onCreateAction(values: T) {
    const result = await createAction(values)
    if (result.status === 'error') {
      toast({ title: result.status, description: result.errors })
      return
    }
    form.reset()
    hideDialog()
    toast({
      title: 'Success!',
      description: `You have successfully created a new ${title}.`
    })
  }

  async function onUpdateAction(values: WithId<T>) {
    const result = await updateAction({
      ...values,
      id: defaultValueForm.id
    })
    hideDialog()
    if (result.status === 'error') {
      toast({ title: result.status, description: result.errors })
      return
    }
    toast({
      title: 'Success!',
      description: `You have successfully update the ${title}.`
    })
  }

  return { form, formType, formRef, isPending, onSubmit, copyButtonIdle, copyButtonSubmitting, defaultValueForm }
}
