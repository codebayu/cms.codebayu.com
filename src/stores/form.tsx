import { create } from 'zustand'
import { FormActionType } from '@/types/actions'

export interface InitialFormState<T> {
  formType: FormActionType
  defaultValueForm: T
}

export interface InitialFormAction<T> {
  setFormType(type: FormActionType): void
  setDefaultValueForm(data: T): void
}
const useDataImplementation = create<InitialFormState<object> & InitialFormAction<object>>(set => ({
  formType: 'create',
  defaultValueForm: {},
  setFormType: type => set({ formType: type }),
  setDefaultValueForm: data => set({ defaultValueForm: data })
}))

export const useFormStore = useDataImplementation as {
  <T>(): InitialFormState<T> & InitialFormAction<T>
  <T, U>(selector: (s: InitialFormState<T> & InitialFormAction<T>) => U): U
}
