'use client'

import useActionTable from '@/hooks/tables/useActionTable'
import { ILearn } from '@/constants/learn'
import { learnDefaultValueForm } from '@/constants/learn'
import ContentContainer from '@/components/elements/content-container'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { careerTableColumns } from './columns'
import LearnForm from './learn-form'

export default function LearnTable({ learns }: { learns: ILearn[] }) {
  const { handleClickAdd } = useActionTable<ILearn>({
    defaultValue: learnDefaultValueForm,
    dialogContent: () => <LearnForm />
  })
  return (
    <ContentContainer>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">Learn Content</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Learn
        </Button>
      </div>
      <DataTable columns={careerTableColumns} data={learns} />
    </ContentContainer>
  )
}
