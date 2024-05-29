import { ServiceUseCase } from '@/usecase/service'
import ServiceTable from './component/service-table'

export default async function ServicePage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page) || 1
  const usecase = new ServiceUseCase()
  const service = await usecase.getAllService({ page })
  return (
    <div className="flex w-full justify-center">
      <ServiceTable service={service} />
    </div>
  )
}
