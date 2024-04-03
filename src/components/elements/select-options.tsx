import React from 'react'
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormControl } from '../ui/form'

interface SelectOptionsProps<T extends FieldValues, K extends Path<T>> {
  field: ControllerRenderProps<T, K>
  options: { value: string; label: string }[]
}

export default function SelectOptions<T extends FieldValues, K extends Path<T>>({
  field,
  options
}: SelectOptionsProps<T, K>) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
