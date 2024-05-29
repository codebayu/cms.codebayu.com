import { CareerUseCase } from '@/usecase/career'
import CareerTable from './component/career-table'

export default async function CareerPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page) || 1
  const usecase = new CareerUseCase()
  const careers = await usecase.getAllCareer({ page })
  return (
    <div className="flex w-full flex-col justify-center">
      <CareerTable careers={careers} />
    </div>
  )
}
