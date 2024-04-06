import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { User } from '@/use-cases/users/types'
import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import Navigation from '@/components/layouts/navigation'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const GlobalDialog = dynamic(() => import('@/components/elements/global-dialog'), { ssr: false })

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
          <NextTopLoader
            color="#05b6d3"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
          />
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
