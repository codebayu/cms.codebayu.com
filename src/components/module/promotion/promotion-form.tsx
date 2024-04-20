'use client'

import React from 'react'
import { promotionSchema } from '@/entities/promotion'
import { ICreatePromotionDto, IPromotion } from '@/use-cases/promotions/types'
import { createPromotionAction } from '@/actions/promotions/create-promotion.action'
import { updatePromotionAction } from '@/actions/promotions/update-promotion.action'
import useActionForm from '@/hooks/forms/useActionForm'
import { pageOptions, promotionDefaultValueForm } from '@/constants/promotion'
import SubmitButton from '@/components/elements/submit-button'
import SwitchCard from '@/components/elements/switch-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function PromotionForm() {
  const { copyButtonIdle, copyButtonSubmitting, form, formType, defaultValueForm, isPending, onSubmit } = useActionForm<
    IPromotion,
    ICreatePromotionDto
  >({
    title: 'promotion',
    schema: promotionSchema,
    createAction: createPromotionAction,
    defaultValue: promotionDefaultValueForm,
    updateAction: updatePromotionAction
  })

  function onHandleSubmit(data: ICreatePromotionDto) {
    onSubmit({ ...data })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onHandleSubmit)} className="flex flex-col space-y-6">
          <h2 className="text-2xl font-bold">
            {formType === 'update' ? `Update ${defaultValueForm.text} Promotion` : 'Create  New Promotion'}
          </h2>
          <div className="flex flex-1 space-x-6">
            <div className="flex min-w-80 flex-1 flex-col space-y-2">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Input placeholder="Promotion text" {...field} />
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
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Link</FormLabel>
                    <FormControl>
                      <Input placeholder="Link URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
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
                name="showingOn"
                render={() => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">Add Pages</Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-max">
                      <FormItem>
                        <div className="grid w-full grid-cols-4 gap-2">
                          {pageOptions.map(item => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="showingOn"
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
