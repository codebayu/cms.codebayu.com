import { CellContext } from '@tanstack/react-table'
import useActionCell from '@/hooks/forms/useActionCell'
import { IProject } from '@/constants/project'
import BaseActionCell from '@/components/elements/base-action-cell'
import { deleteProjectAction } from '../action/action-cell'
import ProjectForm from './project-form'

export function ActionCell({ cell }: { cell: CellContext<IProject, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<IProject>({
    cell,
    deleteAction: deleteProjectAction,
    dialogContent: () => <ProjectForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
