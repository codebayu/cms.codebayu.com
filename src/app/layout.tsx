import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { lazy } from 'react'
import { User } from '@/use-cases/users/types'
import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import Navigation from '@/components/layouts/navigation'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const GlobalDialog = lazy(() => import('@/components/elements/global-dialog'))

export const metadata: Metadata = {
  title: 'cms codebayu',
  description: 'cms codebayu'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { getUser } = await auth()
  const user = getUser()
  return (
    <>
      <html lang="en">
        <head />
        <body className={cn('min-h-screen bg-neutral-50 font-sans text-slate-900 antialiased', inter.className)}>
          <main className="relative flex min-h-screen flex-col">
            <Navigation user={user as User} />
            <div className="flex flex-1 p-2 md:px-32 md:py-20">{children}</div>
            <Toaster />
            <GlobalDialog />
          </main>
        </body>
      </html>
    </>
  )
}
