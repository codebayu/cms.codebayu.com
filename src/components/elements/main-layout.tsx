'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React from 'react'
import Sidebar from '@/components/elements/sidebar'
import TopLoader from '@/components/elements/top-loader'
import { Toaster } from '@/components/ui/toaster'

const GlobalDialog = dynamic(() => import('@/components/elements/global-dialog'), { ssr: false })
export default function MainLayout({ children, name }: { children: React.ReactNode; name?: string | null }) {
  const pathname = usePathname()
  return (
    <>
      <TopLoader />
      <Toaster />
      <GlobalDialog />
      {pathname !== '/login' && <Sidebar />}

      <main className="relative flex min-h-screen w-full flex-col bg-[#F9FAFF] dark:bg-neutral-900 dark:text-neutral-200">
        <div className="p-16">
          {pathname !== '/login' && (
            <div className="mb-8 flex w-full items-center justify-between">
              <div className="flex w-full gap-2 text-2xl font-medium">
                <h2 className="text-2xl font-medium capitalize text-neutral-800 dark:text-neutral-200">Hello {name}</h2>
                <div className="animate-waving-hand">👋</div>
              </div>
            </div>
          )}
          {children}
        </div>
      </main>
    </>
  )
}
