'use client'

import { ServiceValidatedFields } from '@/entities/service'
import useServiceForm from '@/hooks/services/useServiceForm'
import SubmitButton from '@/components/elements/submit-button'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function ServiceForm() {
  const { form, formRef, onSubmit, copyButtonIdle, copyButtonSubmitting, formType, defaultValueForm, isPending } =
    useServiceForm()
  return (
    <div>
      <Form {...form}>
        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">
            {formType === 'update' ? `Update ${defaultValueForm.title} Service` : 'Create  New Service'}
          </h2>
          <div className="flex min-w-80 flex-1 flex-col space-y-2">
            {['title', 'description', 'tag'].map(fieldName => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as ServiceValidatedFields}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{fieldName}</FormLabel>
                    <Input placeholder={`Enter ${fieldName}`} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <SubmitButton idleText={copyButtonIdle} submittingText={copyButtonSubmitting} pending={isPending} />
        </form>
      </Form>
    </div>
  )
}
