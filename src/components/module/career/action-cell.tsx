import { Button } from '@/components/ui/button';
import { useCareerStore } from '@/stores/career';
import { ICareer } from '@/use-cases/careers/types';
import { Row } from '@tanstack/react-table';

export function ActionCell({ cell }: { row: Row<ICareer>; cell: any }) {
  const { setFormType, setDefaultValueForm } = useCareerStore();
  function handleEdit() {
    setDefaultValueForm(cell.row.original);
    setFormType('update');
  }
  return (
    <div className="flex flex-row items-center gap-2">
      <Button size="sm" variant="ghost" onClick={handleEdit}>
        Edit
      </Button>
    </div>
  );
}
