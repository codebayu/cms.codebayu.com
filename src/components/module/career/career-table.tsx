'use client'

import { careerDefaultValueForm } from '@/constants/career'
import { ICareer } from '@/use-cases/careers/types'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useCareerStore } from '@/stores/career'
import { careerTableColumns } from './columns'

export default function CareerTable({ careers }: { careers: ICareer[] }) {
  const { setFormType, setDefaultValueForm } = useCareerStore()
  function handleClickAdd() {
    setDefaultValueForm({ ...careerDefaultValueForm, id: '', slug: '' })
    setFormType('create')
  }
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Career</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          Add Career
        </Button>
      </div>
      <DataTable columns={careerTableColumns} data={careers} />
    </div>
  )
}
