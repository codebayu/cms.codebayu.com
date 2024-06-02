'use client'

import useActionForm from '@/hooks/forms/useActionForm'
import {
  ICareerPayloadCreate,
  ICareerPayloadUpdate,
  careerDefaultValueForm,
  careerSchema,
  locationsTypeOptions,
  typeOptions
} from '@/constants/career'
import DatePicker from '@/components/elements/date-picker'
import SelectOptions from '@/components/elements/select-options'
import SubmitButton from '@/components/elements/submit-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createCareerAction, updateCareerAction } from '../action/career-form'

export default function CareerForm() {
  const { copyButtonIdle, copyButtonSubmitting, form, formType, defaultValueForm, isPending, onSubmit } = useActionForm<
    ICareerPayloadCreate,
    ICareerPayloadUpdate
  >({
    title: 'career',
    schema: careerSchema,
    createAction: createCareerAction,
    defaultValue: careerDefaultValueForm,
    updateAction: updateCareerAction
  })
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
          <SubmitButton idleText={copyButtonIdle} submittingText={copyButtonSubmitting} pending={isPending} />
        </form>
      </Form>
    </div>
  )
}
