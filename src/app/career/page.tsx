import { getCareers } from '@/data-access/careers/get-careers.persistence'
import Greet from '@/components/elements/greet'
import CareerTable from '@/components/module/career/career-table'

export default async function CareerPage() {
  const careers = await getCareers()
  return (
    <div className="flex w-full flex-col justify-center">
      <Greet />
      <CareerTable careers={careers} />
    </div>
  )
}
