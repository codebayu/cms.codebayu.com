'use client'

import { generateSlug } from '@/utils/functions'
import useActionForm from '@/hooks/forms/useActionForm'
import {
  ILearnPayloadCreate,
  ILearnPayloadUpdate,
  languageOptions,
  learnDefaultValueForm,
  learnSchema,
  levelOptions
} from '@/constants/learn'
import SelectOptions from '@/components/elements/select-options'
import SubmitButton from '@/components/elements/submit-button'
import SwitchCard from '@/components/elements/switch-card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createLearnAction, updateLearnAction } from '../action/learn-form'

export default function LearnForm() {
  const { copyButtonIdle, copyButtonSubmitting, form, formType, isPending, onSubmit } = useActionForm<
    ILearnPayloadCreate,
    ILearnPayloadUpdate
  >({
    title: 'learn',
    schema: learnSchema,
    createAction: createLearnAction,
    defaultValue: learnDefaultValueForm,
    updateAction: updateLearnAction
  })

  function onHandleSubmit(data: ILearnPayloadCreate) {
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
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Learn Typescript" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <SwitchCard
                    field={field}
                    title="Mark as featured"
                    description="Set to true will display the badge component."
                  />
                )}
              />
              <FormField
                control={form.control}
                name="isShow"
                render={({ field }) => (
                  <SwitchCard
                    field={field}
                    title="Mark as show"
                    description="Set to false will hide the card from list."
                  />
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
