import { CellContext } from '@tanstack/react-table'
import { IPromotion } from '@/use-cases/promotions/types'
import { deletePromotionAction } from '@/actions/promotions/delete-promotion.action'
import useActionCell from '@/hooks/forms/useActionCell'
import BaseActionCell from '@/components/elements/base-action-cell'
import PromotionForm from './promotion-form'

export function ActionCell({ cell }: { cell: CellContext<IPromotion, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<IPromotion>({
    cell,
    deleteAction: deletePromotionAction,
    dialogContent: () => <PromotionForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
