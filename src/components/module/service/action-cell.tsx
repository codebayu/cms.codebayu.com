import { CellContext } from '@tanstack/react-table'
import { IService } from '@/use-cases/services/types'
import { deleteServiceAction } from '@/actions/services/delete-service.action'
import useActionCell from '@/hooks/forms/useActionCell'
import BaseActionCell from '@/components/elements/base-action-cell'
import ServiceForm from './service-form'

export function ActionCell({ cell }: { cell: CellContext<IService, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<IService>({
    cell,
    deleteAction: deleteServiceAction,
    dialogContent: () => <ServiceForm />
  })

  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
