import CareerForm from '@/components/module/career/career-form';
import CareerTable from '@/components/module/career/career-table';
import { getCareers } from '@/data-access/careers/get-careers.persistence';

export default async function CareerPage() {
  const careers = await getCareers();
  return (
    <div className="flex w-full justify-between relative">
      <CareerTable careers={careers} />
      <CareerForm />
    </div>
  );
}
