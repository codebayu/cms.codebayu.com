import { getServices } from '@/data-access/services/get-services.persistence'
import ServiceForm from '@/components/module/service/service-form'
import ServiceTable from '@/components/module/service/service-table'

export default async function ServicePage() {
  const service = await getServices()
  return (
    <div className="flex w-full justify-between gap-10">
      <ServiceTable service={service} />
      <ServiceForm />
    </div>
  )
}
