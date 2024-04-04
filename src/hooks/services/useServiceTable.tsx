import { useServiceStore } from '@/stores/service'
import { serviceDefaultValueForm } from '@/constants/service'

export default function useServiceTable() {
  const { setFormType, setDefaultValueForm } = useServiceStore()
  function handleClickAdd() {
    setDefaultValueForm({ ...serviceDefaultValueForm, id: '' })
    setFormType('create')
  }
  return { handleClickAdd }
}
