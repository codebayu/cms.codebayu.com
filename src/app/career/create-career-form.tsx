'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { careerSchema } from '@/entities/career';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createCareerAction } from './_actions/create-career.action';
import DatePicker from '@/components/elements/date-picker';
import SelectOptions from '@/components/elements/select-options';
import { generateSlug } from '@/utils/functions';
import { useToast } from '@/components/ui/use-toast';
import { ReloadIcon } from '@radix-ui/react-icons';

const locationsTypeOptions = [
  { label: 'On-site', value: 'on-site' },
  { label: 'Remote', value: 'remote' },
  { label: 'Hybrid', value: 'hybrid' },
];

const typeOptions = [
  { label: 'Full-time', value: 'full-time' },
  { label: 'Part-time', value: 'part-time' },
  { label: 'Contract', value: 'contract' },
  { label: 'Internship', value: 'internship' },
  { label: 'Freelance', value: 'freelance' },
];

export default function CreateCareerForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof careerSchema>>({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      position: '',
      company: '',
      link: '',
      location: '',
      locationType: 'on-site',
      type: 'full-time',
      startDate: new Date(),
      endDate: new Date(),
      logo: '',
    },
  });
  const isFormSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof careerSchema>) {
    const result = await createCareerAction({
      ...values,
      slug: generateSlug(values.company + ' ' + values.position),
    });
    if (result.status !== 'success') return;
    form.reset();
    toast({
      title: 'Success!',
      description: `You have successfully created a new career.`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <h2 className="text-2xl font-bold">Create New Career</h2>
        <div className="flex flex-1 space-x-6">
          <div className="flex flex-1 min-w-80 flex-col space-y-2">
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

          <div className="flex flex-1 min-w-80 flex-col space-y-2">
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
          {isFormSubmitting ? (
            <ReloadIcon className="w-5 h-5 animate-spin" />
          ) : null}
          {isFormSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
}
