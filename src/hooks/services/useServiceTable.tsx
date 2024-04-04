import { IService } from '@/use-cases/services/types'
import { useFormStore } from '@/stores/form'
import { serviceDefaultValueForm } from '@/constants/service'

export default function useServiceTable() {
  const { setFormType, setDefaultValueForm } = useFormStore<IService>()
  function handleClickAdd() {
    setDefaultValueForm({ ...serviceDefaultValueForm, id: '' })
    setFormType('create')
  }
  return { handleClickAdd }
}
