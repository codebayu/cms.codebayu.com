import { CellContext } from '@tanstack/react-table'
import useActionCell from '@/hooks/forms/useActionCell'
import { ILearn } from '@/constants/learn'
import BaseActionCell from '@/components/elements/base-action-cell'
import { deleteLearnAction } from '../action/action-cell'
import LearnForm from './learn-form'

export function ActionCell({ cell }: { cell: CellContext<ILearn, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<ILearn>({
    cell,
    deleteAction: deleteLearnAction,
    dialogContent: () => <LearnForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
