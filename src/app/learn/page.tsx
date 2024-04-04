import { getLearns } from '@/data-access/learns/get-learns.persistence'
import LearnForm from '@/components/module/learn/learn-form'
import LearnTable from '@/components/module/learn/learn-table'

export default async function LearnPage() {
  const learns = await getLearns()
  return (
    <div className="flex w-full justify-between gap-10">
      <LearnTable learns={learns} />
      <LearnForm />
    </div>
  )
}
