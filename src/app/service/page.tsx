import { getServices } from '@/data-access/services/get-services.persistence'
import ServiceTable from '@/components/module/service/service-table'

export default async function ServicePage() {
  const service = await getServices()
  return (
    <div className="flex w-full justify-center">
      <ServiceTable service={service} />
    </div>
  )
}
