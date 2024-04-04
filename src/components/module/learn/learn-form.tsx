'use client'

import { learnSchema } from '@/entities/learn'
import { ICreateLearnDto, ILearn } from '@/use-cases/learns/types'
import { createLearnAction } from '@/actions/learns/create-learn.action'
import { updateLearnAction } from '@/actions/learns/update-learn.action'
import { generateSlug } from '@/utils/functions'
import useActionForm from '@/hooks/forms/useActionForm'
import { languageOptions, learnDefaultValueForm, levelOptions } from '@/constants/learn'
import SelectOptions from '@/components/elements/select-options'
import SubmitButton from '@/components/elements/submit-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function LearnForm() {
  const { copyButtonIdle, copyButtonSubmitting, form, formType, isPending, onSubmit } = useActionForm<
    ILearn,
    ICreateLearnDto
  >({
    title: 'learn',
    schema: learnSchema,
    createAction: createLearnAction,
    defaultValue: learnDefaultValueForm,
    updateAction: updateLearnAction
  })

  function onHandleSubmit(data: ICreateLearnDto) {
    onSubmit({ ...data, slug: generateSlug(data.title) })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">{formType === 'update' ? `Update Learn` : 'Create  New Learn'}</h2>
          <div className="flex flex-1 space-x-6">
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Typescript" {...field} />
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
                      <Input placeholder="Learn Typescript" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input placeholder="Image path" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNew"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className="m-0" />
                    </FormControl>
                    <FormLabel className="!mt-0">Is New</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isShow"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className="m-0" />
                    </FormControl>
                    <FormLabel className="!mt-0">Is Show</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <SelectOptions field={field} options={levelOptions} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <SelectOptions field={field} options={languageOptions} />
                    </FormControl>
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