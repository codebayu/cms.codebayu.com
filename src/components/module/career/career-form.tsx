'use client'

import { careerDefaultValueForm, locationsTypeOptions, typeOptions } from '@/constants/career'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { careerSchema } from '@/entities/career'
import { generateSlug } from '@/utils/functions'
import { createCareerAction } from '@/app/career/actions/create-career.action'
import { updateCareerAction } from '@/app/career/actions/update-career.action'
import DatePicker from '@/components/elements/date-picker'
import SelectOptions from '@/components/elements/select-options'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useCareerStore } from '@/stores/career'

type FormValues = z.infer<typeof careerSchema>

export default function CareerForm() {
  const { toast } = useToast()
  const { formType, defaultValueForm } = useCareerStore()
  const form = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: careerDefaultValueForm,
    values: defaultValueForm
  })
  const isFormSubmitting = form.formState.isSubmitting

  async function onSubmit(values: FormValues) {
    const slug = generateSlug(values.company + ' ' + values.position)
    if (formType === 'create') {
      await onCreateAction(values, slug)
      return
    }
    await onUpdateAction(values, slug)
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
  const copyButtonSubmitting = formType === 'create' ? 'Creating...' : 'Updating...'

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">
            {formType === 'update' ? `Update Career on ${defaultValueForm.company}` : 'Create  New Career'}
          </h2>
          <div className="flex flex-1 space-x-6">
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input placeholder="Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Google" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo</FormLabel>
                    <FormControl>
                      <Input placeholder="Logo path" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Jakarta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Type</FormLabel>
                    <SelectOptions field={field} options={locationsTypeOptions} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Company website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <SelectOptions field={field} options={typeOptions} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="my-[5px]">Start Date</FormLabel>
                    <FormControl>
                      <DatePicker field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="my-[5px]">End Date</FormLabel>
                    <DatePicker field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
