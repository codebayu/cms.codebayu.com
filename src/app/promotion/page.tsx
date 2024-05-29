import { PromotionUseCase } from '@/usecase/promotion'
import PromotionTable from './component/promotion-table'

export default async function PromotionPage({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page) || 1
  const usecase = new PromotionUseCase()
  const promotions = await usecase.getAllPromotion({ page })
  return (
    <div className="flex w-full justify-center">
      <PromotionTable promotions={promotions} />
    </div>
  )
}
