import { getLearns } from '@/data-access/learns/get-learns.persistence'
import LearnTable from '@/components/module/learn/learn-table'

export default async function LearnPage() {
  const learns = await getLearns()
  return (
    <div className="flex w-full justify-center">
      <LearnTable learns={learns} />
    </div>
  )
}
