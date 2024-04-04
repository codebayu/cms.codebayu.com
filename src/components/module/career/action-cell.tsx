import { CellContext } from '@tanstack/react-table'
import { ICareer } from '@/use-cases/careers/types'
import useCareerActionCell from '@/hooks/careers/useCareerActionCell'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function ActionCell({ cell }: { cell: CellContext<ICareer, unknown> }) {
  const { handleDelete, handleEdit } = useCareerActionCell(cell)
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
            <p>Are you sure you want to delete this career?</p>
            <Button size="sm" variant="destructive" className="w-min self-end" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
