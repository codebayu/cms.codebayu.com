'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ILearn } from '@/use-cases/learns/types'
import { ActionCell } from './action-cell'

export const careerTableColumns: ColumnDef<ILearn>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'language',
    header: 'Language'
  },
  {
    accessorKey: 'level',
    header: 'Level'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: cell => <ActionCell cell={cell} />
  }
]
