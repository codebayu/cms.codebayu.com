'use client'

import { generateSlug } from '@/utils/functions'
import useActionForm from '@/hooks/forms/useActionForm'
import {
  IProjectPayloadCreate,
  IProjectPayloadUpdate,
  projectDefaultValueForm,
  projectSchema,
  stackOptions
} from '@/constants/project'
import SubmitButton from '@/components/elements/submit-button'
import SwitchCard from '@/components/elements/switch-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { createProjectAction, updateProjectAction } from '../action/project-form'

export default function ProjectForm() {
  const { copyButtonIdle, copyButtonSubmitting, form, formType, defaultValueForm, isPending, onSubmit } = useActionForm<
    IProjectPayloadCreate,
    IProjectPayloadUpdate
  >({
    title: 'project',
    schema: projectSchema,
    createAction: createProjectAction,
    defaultValue: projectDefaultValueForm,
    updateAction: updateProjectAction
  })

  function onHandleSubmit(data: IProjectPayloadCreate) {
    onSubmit({ ...data, slug: generateSlug(data.title) })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">
            {formType === 'update' ? `Update ${defaultValueForm.title} Project` : 'Create  New Project'}
          </h2>
          <div className="flex flex-1 space-x-6">
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Project title" {...field} />
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
                name="linkDemo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Demo</FormLabel>
                    <FormControl>
                      <Input placeholder="Demo path" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkGithub"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link Github</FormLabel>
                    <FormControl>
                      <Input placeholder="Github link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <Input placeholder="Content" {...field} />
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
                    <Textarea placeholder="Project description" {...field} />
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

              <FormField
                control={form.control}
                name="stacks"
                render={() => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Add Stacks</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-max">
                      <FormItem>
                        <div className="grid w-full grid-cols-4 gap-2">
                          {stackOptions.map(item => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="stacks"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={checked => {
                                          return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(field.value?.filter(value => value !== item.id))
                                        }}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    </PopoverContent>
                  </Popover>
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
