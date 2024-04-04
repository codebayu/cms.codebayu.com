import { useFormStore } from '@/stores/form'

interface ActionTableDependencies<T> {
  defaultValue: T
}

export default function useActionTable<T>({ defaultValue }: ActionTableDependencies<T>) {
  const { setFormType, setDefaultValueForm } = useFormStore<T>()
  function handleClickAdd() {
    setDefaultValueForm({ ...defaultValue, id: '' })
    setFormType('create')
  }
  return { handleClickAdd }
}
