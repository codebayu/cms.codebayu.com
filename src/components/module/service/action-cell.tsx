import { CellContext } from '@tanstack/react-table'
import { IService } from '@/use-cases/services/types'
import { deleteServiceAction } from '@/app/service/actions/delete-service.action'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useServiceStore } from '@/stores/service'

export function ActionCell({ cell }: { cell: CellContext<IService, unknown> }) {
  const { setFormType, setDefaultValueForm } = useServiceStore()
  function handleEdit() {
    setDefaultValueForm(cell.row.original)
    setFormType('update')
  }

  async function handleDelete() {
    const cellId = cell.row.original.id
    if (cellId) await deleteServiceAction(cellId)
  }

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
            <p>Are you sure you want to delete this service?</p>
            <Button size="sm" variant="destructive" className="w-min self-end" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
