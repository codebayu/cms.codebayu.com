import { CellContext } from '@tanstack/react-table'
import useActionCell from '@/hooks/forms/useActionCell'
import { IPromotion } from '@/constants/promotion'
import BaseActionCell from '@/components/elements/base-action-cell'
import { deletePromotionAction } from '../action/action-cell'
import PromotionForm from './promotion-form'

export function ActionCell({ cell }: { cell: CellContext<IPromotion, unknown> }) {
  const { handleDelete, handleEdit } = useActionCell<IPromotion>({
    cell,
    deleteAction: deletePromotionAction,
    dialogContent: () => <PromotionForm />
  })
  return <BaseActionCell handleEdit={handleEdit} handleDelete={handleDelete} />
}
