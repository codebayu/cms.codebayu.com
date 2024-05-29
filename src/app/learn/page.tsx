import { LearnUseCase } from '@/usecase/learn'
import LearnTable from './component/learn-table'

export default async function LearnPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page) || 1
  const usecase = new LearnUseCase()
  const learns = await usecase.getAllLearn({ page })
  return (
    <div className="flex w-full justify-center">
      <LearnTable learns={learns} />
    </div>
  )
}
