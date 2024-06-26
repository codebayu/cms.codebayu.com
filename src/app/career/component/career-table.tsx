'use client'

import useActionTable from '@/hooks/tables/useActionTable'
import { ICareer, careerDefaultValueForm } from '@/constants/career'
import ContentContainer from '@/components/elements/content-container'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import CareerForm from './career-form'
import { careerTableColumns } from './columns'

export default function CareerTable({ careers }: { careers: ICareer[] }) {
  const { handleClickAdd } = useActionTable<ICareer>({
    defaultValue: careerDefaultValueForm,
    dialogContent: () => <CareerForm />
  })
  return (
    <ContentContainer>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Career</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Career
        </Button>
      </div>
      <DataTable columns={careerTableColumns} data={careers} />
    </ContentContainer>
  )
}
