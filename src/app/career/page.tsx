import { getCareers } from '@/data-access/careers/get-careers.persistence'
import CareerForm from '@/components/module/career/career-form'
import CareerTable from '@/components/module/career/career-table'

export default async function CareerPage() {
  const careers = await getCareers()
  return (
    <div className="relative flex w-full justify-between">
      <CareerTable careers={careers} />
      <CareerForm />
    </div>
  )
}
