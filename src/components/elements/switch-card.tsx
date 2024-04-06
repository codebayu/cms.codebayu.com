import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import { FormControl, FormDescription, FormItem, FormLabel } from '../ui/form'
import { Switch } from '../ui/switch'

interface SwitchCardProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>
  title: string
  description: string
}

export default function SwitchCard<T extends FieldValues, K extends Path<T>>({
  field,
  title,
  description
}: SwitchCardProps<T, K>) {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <FormLabel>{title}</FormLabel>
        <FormDescription>{description}</FormDescription>
      </div>
      <FormControl>
        <Switch checked={field.value} onCheckedChange={field.onChange} className="!mt-0" />
      </FormControl>
    </FormItem>
  )
}
