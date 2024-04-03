import { create } from 'zustand'
import { IService } from '@/use-cases/services/types'
import { FormActionType } from '@/types/actions'

export interface InitialServiceState {
  formType: FormActionType
  defaultValueForm: IService
}

export interface InitialServiceAction {
  setFormType(type: FormActionType): void
  setDefaultValueForm(data: IService): void
}

export const useServiceStore = create<InitialServiceState & InitialServiceAction>()(set => ({
  formType: 'create',
  defaultValueForm: {} as IService,
  setFormType: type => set({ formType: type }),
  setDefaultValueForm: data => set({ defaultValueForm: data })
}))
