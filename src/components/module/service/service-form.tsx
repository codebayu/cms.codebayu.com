'use client'

import { serviceDefaultValueForm } from '@/constants/service'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { serviceSchema } from '@/entities/service'
import { createServiceAction } from '@/app/service/actions/create-service.action'
import { updateServiceAction } from '@/app/service/actions/update-service.action'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useServiceStore } from '@/stores/service'

type FormValues = z.infer<typeof serviceSchema>

export default function ServiceForm() {
  const { toast } = useToast()
  const { formType, defaultValueForm } = useServiceStore()
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: serviceDefaultValueForm,
    values: defaultValueForm
  })
  const isFormSubmitting = form.formState.isSubmitting

  async function onSubmit(values: FormValues) {
    if (formType === 'create') {
      await onCreateAction(values)
      return
    }
    await onUpdateAction(values)
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
      description: `You have successfully created a new career.`
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
  const copyButtonSubmitting = formType === 'create' ? 'Creating...' : 'Updating...'

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">
            {formType === 'update' ? `Update ${defaultValueForm.title} Service` : 'Create  New Service'}
          </h2>
          <div className="flex min-w-80 flex-1 flex-col space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Development" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Explain your service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input placeholder="Coding" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isFormSubmitting}>
            {isFormSubmitting ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : null}
            {isFormSubmitting ? copyButtonSubmitting : copyButtonIdle}
          </Button>
        </form>
      </Form>
    </div>
  )
}
