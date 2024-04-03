/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { ICareer } from '@/use-cases/careers/types';
import { ColumnDef } from '@tanstack/react-table';
import { ActionCell } from './action-cell';

export const careerTableColumns: ColumnDef<ICareer>[] = [
  {
    accessorKey: 'company',
    header: 'Company',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'locationType',
    header: 'Location Type',
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: ActionCell,
  },
];
