import { CellContext } from '@tanstack/react-table'
import { ICareer } from '@/use-cases/careers/types'
import { deleteCareerAction } from '@/actions/careers/delete-career.action'
import useActionCell from '@/hooks/forms/useActionCell'
import BaseActionCell from '@/components/elements/base-action-cell'
import CareerForm from './career-form'

export function ActionCell({ cell }: { cell: CellContext<ICareer, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<ICareer>({
    cell,
    deleteAction: deleteCareerAction,
    dialogContent: () => <CareerForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
