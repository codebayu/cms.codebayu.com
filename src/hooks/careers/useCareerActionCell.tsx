import { CellContext } from '@tanstack/react-table'
import { ICareer } from '@/use-cases/careers/types'
import { deleteCareerAction } from '@/actions/careers/delete-career.action'
import { useCareerStore } from '@/stores/career'

export default function useCareerActionCell(cell: CellContext<ICareer, unknown>) {
  const { setFormType, setDefaultValueForm } = useCareerStore()
  function handleEdit() {
    setDefaultValueForm(cell.row.original)
    setFormType('update')
  }

  async function handleDelete() {
    const cellId = cell.row.original.id
    if (cellId) await deleteCareerAction(cellId)
  }
  return { handleEdit, handleDelete }
}
