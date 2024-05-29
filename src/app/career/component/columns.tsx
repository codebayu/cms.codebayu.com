'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ICareer } from '@/constants/career'
import { ActionCell } from './action-cell'

export const careerTableColumns: ColumnDef<ICareer>[] = [
  {
    accessorKey: 'company',
    header: 'Company'
  },
  {
    accessorKey: 'position',
    header: 'Position'
  },
  {
    accessorKey: 'locationType',
    header: 'Location Type'
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: cell => <ActionCell cell={cell} />
  }
]
