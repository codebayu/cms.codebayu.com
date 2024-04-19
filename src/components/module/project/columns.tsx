'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IProject } from '@/use-cases/projects/types'
import { ActionCell } from './action-cell'

export const projectTableColumns: ColumnDef<IProject>[] = [
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: cell => <ActionCell cell={cell} />
  }
]
