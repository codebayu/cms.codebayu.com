'use client'

import React from 'react'
import { IPromotion } from '@/use-cases/promotions/types'
import useActionTable from '@/hooks/tables/useActionTable'
import { promotionDefaultValueForm } from '@/constants/promotion'
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
    <div className="w-full">
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">List Promotion</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Promotion
        </Button>
      </div>
      <DataTable columns={promotionTableColumns} data={promotions} />
    </div>
  )
}
