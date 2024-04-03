import { getCareers } from '@/data-access/careers/get-careers.persistence'
import CareerForm from '@/components/module/career/career-form'
import CareerTable from '@/components/module/career/career-table'

export default async function CareerPage() {
  const careers = await getCareers()
  return (
    <div className="flex w-full justify-between gap-10">
      <CareerTable careers={careers} />
      <CareerForm />
    </div>
  )
}
