'use client'

import { IService } from '@/use-cases/services/types'
import useActionTable from '@/hooks/tables/useActionTable'
import { serviceDefaultValueForm } from '@/constants/service'
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
    <div className="w-[50%]">
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Service</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Service
        </Button>
      </div>
      <DataTable columns={serviceTableColumns} data={service} />
    </div>
  )
}
