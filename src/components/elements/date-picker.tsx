import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { FormControl } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'

interface DatePickerProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>
}

export default function DatePicker<T extends FieldValues, K extends Path<T>>({ field }: DatePickerProps<T, K>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
          >
            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
