import { CellContext } from '@tanstack/react-table'
import { useFormStore } from '@/stores/form'

export default function useActionCell<T extends { id?: string | undefined }>({
  cell,
  deleteAction
}: {
  cell: CellContext<T, unknown>
  deleteAction: (id: string) => Promise<void>
}) {
  const { setFormType, setDefaultValueForm } = useFormStore<T>()
  function handleEdit() {
    setDefaultValueForm(cell.row.original)
    setFormType('update')
  }

  async function handleDelete() {
    const cellId = cell.row.original.id
    if (cellId) await deleteAction(cellId)
  }
  return { handleEdit, handleDelete }
}
