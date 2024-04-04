import { getCareers } from '@/data-access/careers/get-careers.persistence'
import CareerTable from '@/components/module/career/career-table'

export default async function CareerPage() {
  const careers = await getCareers()
  return (
    <div className="flex w-full justify-center">
      <CareerTable careers={careers} />
    </div>
  )
}
