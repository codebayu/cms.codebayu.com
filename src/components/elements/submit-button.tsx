import { ReloadIcon } from '@radix-ui/react-icons'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export default function SubmitButton({
  idleText,
  submittingText,
  pending,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  idleText: string
  submittingText: string
  pending: boolean
}) {
  return (
    <Button
      {...props}
      type="submit"
      className={cn('disabled:cursor-default disabled:bg-gray-400', props.className)}
      disabled={pending}
    >
      {pending ? <ReloadIcon className="mr-2 h-5 w-5 animate-spin" /> : null}
      {pending ? submittingText : idleText}
    </Button>
  )
}
