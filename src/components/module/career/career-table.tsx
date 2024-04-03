'use client';

import { DataTable } from '@/components/ui/data-table';
import { careerTableColumns } from './columns';
import { ICareer } from '@/use-cases/careers/types';
import { useCareerStore } from '@/stores/career';
import { Button } from '@/components/ui/button';
import { careerDefaultValueForm } from '@/constants/career';

export default function CareerTable({ careers }: { careers: ICareer[] }) {
  const { setFormType, setDefaultValueForm } = useCareerStore();
  function handleClickAdd() {
    setDefaultValueForm({ ...careerDefaultValueForm, id: '', slug: '' });
    setFormType('create');
  }
  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h2 className="text-2xl font-bold mb-6">My Career</h2>
        <Button variant="outline" onClick={handleClickAdd}>
          Add Career
        </Button>
      </div>
      <DataTable columns={careerTableColumns} data={careers} />
    </div>
  );
}
