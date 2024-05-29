import { CellContext } from '@tanstack/react-table'
import useActionCell from '@/hooks/forms/useActionCell'
import { IService } from '@/constants/service'
import BaseActionCell from '@/components/elements/base-action-cell'
import { deleteServiceAction } from '../action/action-cell'
import ServiceForm from './service-form'

export function ActionCell({ cell }: { cell: CellContext<IService, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<IService>({
    cell,
    deleteAction: deleteServiceAction,
    dialogContent: () => <ServiceForm />
  })

  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
