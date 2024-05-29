'use client'

import useActionTable from '@/hooks/tables/useActionTable'
import { IService } from '@/constants/service'
import { serviceDefaultValueForm } from '@/constants/service'
import ContentContainer from '@/components/elements/content-container'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { serviceTableColumns } from './columns'
import ServiceForm from './service-form'

export default function ServiceTable({ service }: { service: IService[] }) {
  const { handleClickAdd } = useActionTable<IService>({
    defaultValue: serviceDefaultValueForm,
    dialogContent: () => <ServiceForm />
  })
  return (
    <ContentContainer>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Service</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Service
        </Button>
      </div>
      <DataTable columns={serviceTableColumns} data={service} />
    </ContentContainer>
  )
}
