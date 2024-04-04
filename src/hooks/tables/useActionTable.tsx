import { ReactNode } from 'react'
import { useDialogStore } from '@/stores/dialog'
import { useFormStore } from '@/stores/form'

interface ActionTableDependencies<T> {
  defaultValue: T
  dialogContent: () => ReactNode
}

export default function useActionTable<T>({ defaultValue, dialogContent }: ActionTableDependencies<T>) {
  const { setFormType, setDefaultValueForm } = useFormStore<T>()
  const { showDialog, setContent } = useDialogStore()
  function handleClickAdd() {
    setDefaultValueForm({ ...defaultValue, id: '' })
    setFormType('create')
    setContent(dialogContent())
    showDialog()
  }
  return { handleClickAdd }
}
