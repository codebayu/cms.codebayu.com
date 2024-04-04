import { ICareer } from '@/use-cases/careers/types'
import { useFormStore } from '@/stores/form'
import { careerDefaultValueForm } from '@/constants/career'

export default function useCareerTable() {
  const { setFormType, setDefaultValueForm } = useFormStore<ICareer>()
  function handleClickAdd() {
    setDefaultValueForm({ ...careerDefaultValueForm, id: '', slug: '' })
    setFormType('create')
  }
  return { handleClickAdd }
}
