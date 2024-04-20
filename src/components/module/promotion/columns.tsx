'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IPromotion } from '@/use-cases/promotions/types'
import { ActionCell } from './action-cell'

export const promotionTableColumns: ColumnDef<IPromotion>[] = [
  {
    accessorKey: 'text',
    header: 'Text'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: cell => <ActionCell cell={cell} />
  }
]
