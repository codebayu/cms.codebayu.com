'use client'

import { useDialogStore } from '@/stores/dialog'
import { Dialog, DialogContent } from '../ui/dialog'

export default function GlobalDialog() {
  const { hideDialog, isOpen, content } = useDialogStore()
  if (!isOpen) return null
  return (
    <Dialog onOpenChange={hideDialog} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent>{content()}</DialogContent>
    </Dialog>
  )
}
