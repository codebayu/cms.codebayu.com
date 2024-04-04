import { CellContext } from '@tanstack/react-table'
import { ILearn } from '@/use-cases/learns/types'
import { deleteLearnAction } from '@/actions/learns/delete-learn.action'
import useActionCell from '@/hooks/forms/useActionCell'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function ActionCell({ cell }: { cell: CellContext<ILearn, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<ILearn>({ cell, deleteAction: deleteLearnAction })
  return (
    <div className="flex flex-row items-center gap-1">
      <Button size="sm" variant="ghost" onClick={handleEdit}>
        Edit
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost">
            Delete
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col space-y-4">
            <p>Are you sure you want to delete this learn?</p>
            <Button size="sm" variant="destructive" className="w-min self-end" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
