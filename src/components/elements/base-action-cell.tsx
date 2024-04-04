import useHasMounted from '@/hooks/useHasMounted'
import { Button } from '../ui/button'
import ConfirmDelete from './confirm-delete'

interface BaseActionCellProps {
  handleEdit: () => void
  handleDelete: () => void
}

export default function BaseActionCell({ handleEdit, handleDelete }: BaseActionCellProps) {
  const isMounted = useHasMounted()
  if (!isMounted) return null
  return (
    <div className="flex flex-row items-center gap-1">
      <Button size="sm" variant="ghost" onClick={handleEdit}>
        Edit
      </Button>
      <ConfirmDelete handleDelete={handleDelete} />
    </div>
  )
}
