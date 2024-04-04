import { ReactNode } from 'react'
import { create } from 'zustand'

export interface InitialDialogState {
  isOpen: boolean
  content: () => ReactNode
}

export interface InitialDialogAction {
  showDialog(): void
  hideDialog(): void
  setContent(content: ReactNode): void
}

export const useDialogStore = create<InitialDialogState & InitialDialogAction>()(set => ({
  isOpen: false,
  content: () => null,
  showDialog: () => set({ isOpen: true }),
  hideDialog: () => set({ isOpen: false }),
  setContent: (content: ReactNode) => set({ content: () => content })
}))
