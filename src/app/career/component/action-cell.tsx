import { CellContext } from '@tanstack/react-table'
import useActionCell from '@/hooks/forms/useActionCell'
import { ICareer } from '@/constants/career'
import BaseActionCell from '@/components/elements/base-action-cell'
import { deleteCareerAction } from '../action/action-cell'
import CareerForm from './career-form'

export function ActionCell({ cell }: { cell: CellContext<ICareer, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<ICareer>({
    cell,
    deleteAction: deleteCareerAction,
    dialogContent: () => <CareerForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
