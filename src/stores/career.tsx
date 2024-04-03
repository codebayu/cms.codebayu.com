import { FormActionType } from '@/types/actions';
import { ICareer } from '@/use-cases/careers/types';
import { create } from 'zustand';

export interface InitialCareerState {
  formType: FormActionType;
  defaultValueForm: ICareer;
}

export interface InitialCareerAction {
  setFormType(type: FormActionType): void;
  setDefaultValueForm(data: ICareer): void;
}

export const useCareerStore = create<
  InitialCareerState & InitialCareerAction
>()((set) => ({
  formType: 'create',
  defaultValueForm: {} as ICareer,
  setFormType: (type) => set({ formType: type }),
  setDefaultValueForm: (data) => set({ defaultValueForm: data }),
}));
