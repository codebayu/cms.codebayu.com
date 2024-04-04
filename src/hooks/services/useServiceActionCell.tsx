import { CellContext } from '@tanstack/react-table'
import { IService } from '@/use-cases/services/types'
import { deleteServiceAction } from '@/actions/services/delete-service.action'
import { useServiceStore } from '@/stores/service'

export default function useServiceActionCell(cell: CellContext<IService, unknown>) {
  const { setFormType, setDefaultValueForm } = useServiceStore()
  function handleEdit() {
    setDefaultValueForm(cell.row.original)
    setFormType('update')
  }

  async function handleDelete() {
    const cellId = cell.row.original.id
    if (cellId) await deleteServiceAction(cellId)
  }
  return { handleEdit, handleDelete }
}
