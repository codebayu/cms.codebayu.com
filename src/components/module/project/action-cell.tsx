import { CellContext } from '@tanstack/react-table'
import { IProject } from '@/use-cases/projects/types'
import { deleteProjectAction } from '@/actions/projects/delete-project.action'
import useActionCell from '@/hooks/forms/useActionCell'
import BaseActionCell from '@/components/elements/base-action-cell'
import ProjectForm from './project-form'

export function ActionCell({ cell }: { cell: CellContext<IProject, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<IProject>({
    cell,
    deleteAction: deleteProjectAction,
    dialogContent: () => <ProjectForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
