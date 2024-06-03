'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useLoginForm from '../action/login-form'

export default function LoginForm() {
  const { form, isPending, onSubmit } = useLoginForm()
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center px-4">
      <div className="flex w-full flex-col justify-center space-y-8 rounded-xl bg-white p-8 shadow-md dark:bg-neutral-950 md:w-max md:min-w-[30rem]">
        <Image
          src="/logo-black.png"
          alt="happykids"
          width={80}
          height={80}
          className="self-center object-cover"
          priority
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.id" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
