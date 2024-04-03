'use client'

import { serviceDefaultValueForm } from '@/constants/service'
import { IService } from '@/use-cases/services/types'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { useServiceStore } from '@/stores/service'
import { serviceTableColumns } from './columns'

export default function ServiceTable({ service }: { service: IService[] }) {
  const { setFormType, setDefaultValueForm } = useServiceStore()
  function handleClickAdd() {
    setDefaultValueForm({ ...serviceDefaultValueForm, id: '' })
    setFormType('create')
  }
  return (
    <div className="w-[50%]">
      <div className="flex items-baseline justify-between">
        <h2 className="mb-6 text-2xl font-bold">My Career</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          New Service
        </Button>
      </div>
      <DataTable columns={serviceTableColumns} data={service} />
    </div>
  )
}
