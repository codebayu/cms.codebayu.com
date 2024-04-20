import { getPromotions } from '@/data-access/promotions/get-promotions.persistence'
import PromotionTable from '@/components/module/promotion/promotion-table'

export default async function PromotionPage() {
  const promotions = await getPromotions()
  return (
    <div className="flex w-full justify-center">
      <PromotionTable promotions={promotions} />
    </div>
  )
}
