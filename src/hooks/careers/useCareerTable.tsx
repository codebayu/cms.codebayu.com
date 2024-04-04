import { useCareerStore } from '@/stores/career'
import { careerDefaultValueForm } from '@/constants/career'

export default function useCareerTable() {
  const { setFormType, setDefaultValueForm } = useCareerStore()
  function handleClickAdd() {
    setDefaultValueForm({ ...careerDefaultValueForm, id: '', slug: '' })
    setFormType('create')
  }
  return { handleClickAdd }
}
