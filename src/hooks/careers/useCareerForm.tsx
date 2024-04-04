import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { careerSchema } from '@/entities/career'
import { createCareerAction } from '@/actions/careers/create-career.action'
import { updateCareerAction } from '@/actions/careers/update-career.action'
import { generateSlug } from '@/utils/functions'
import { useCareerStore } from '@/stores/career'
import { careerDefaultValueForm } from '@/constants/career'
import { useToast } from '@/components/ui/use-toast'

type FormValues = z.infer<typeof careerSchema>

export default function useCareerForm() {
  const { toast } = useToast()
  const { formType, defaultValueForm } = useCareerStore()
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: careerDefaultValueForm,
    values: defaultValueForm
  })

  async function onSubmit(values: FormValues) {
    const slug = generateSlug(values.company + ' ' + values.position)
    startTransition(async () => {
      if (formType === 'create') {
        await onCreateAction(values, slug)
        return
      }
      await onUpdateAction(values, slug)
    })
  }

  async function onCreateAction(values: FormValues, slug: string) {
    const result = await createCareerAction({ ...values, slug })
    if (result.status === 'error') {
      toast({ title: result.status, description: result.errors })
      return
    }
    form.reset()
    toast({
      title: 'Success!',
      description: `You have successfully created a new career.`
    })
  }

  async function onUpdateAction(values: FormValues, slug: string) {
    const result = await updateCareerAction({
      ...values,
      slug,
      id: defaultValueForm.id
    })
    if (result.status === 'error') {
      toast({ title: result.status, description: result.errors })
      return
    }
    toast({
      title: 'Success!',
      description: `You have successfully update the career.`
    })
  }

  const copyButtonIdle = formType === 'create' ? 'Create' : 'Update'
  const copyButtonSubmitting = formType === 'create' ? 'Creating new career...' : 'Updating career...'

  return { form, formType, defaultValueForm, isPending, onSubmit, copyButtonIdle, copyButtonSubmitting }
}
