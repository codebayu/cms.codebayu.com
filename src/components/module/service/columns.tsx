'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IService } from '@/use-cases/services/types'
import { ActionCell } from './action-cell'

export const serviceTableColumns: ColumnDef<IService>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'tag',
    header: 'Tag'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: cell => <ActionCell cell={cell} />
  }
]
