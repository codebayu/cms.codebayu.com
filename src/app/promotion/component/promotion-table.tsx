'use client'

import useActionTable from '@/hooks/tables/useActionTable'
import { IPromotion } from '@/constants/promotion'
import { promotionDefaultValueForm } from '@/constants/promotion'
import ContentContainer from '@/components/elements/content-container'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { promotionTableColumns } from './columns'
import PromotionForm from './promotion-form'

interface PromotionTableProps {
  promotions: IPromotion[]
}

export default function PromotionTable({ promotions }: PromotionTableProps) {
  const { handleClickAdd } = useActionTable<IPromotion>({
    defaultValue: promotionDefaultValueForm,
    dialogContent: () => <PromotionForm />
  })
  return (
    <ContentContainer>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">List Promotion</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Promotion
        </Button>
      </div>
      <DataTable columns={promotionTableColumns} data={promotions} />
    </ContentContainer>
  )
}
