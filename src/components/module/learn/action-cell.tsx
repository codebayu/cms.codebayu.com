import { CellContext } from '@tanstack/react-table'
import { ILearn } from '@/use-cases/learns/types'
import { deleteLearnAction } from '@/actions/learns/delete-learn.action'
import useActionCell from '@/hooks/forms/useActionCell'
import BaseActionCell from '@/components/elements/base-action-cell'
import LearnForm from './learn-form'

export function ActionCell({ cell }: { cell: CellContext<ILearn, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<ILearn>({
    cell,
    deleteAction: deleteLearnAction,
    dialogContent: () => <LearnForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
