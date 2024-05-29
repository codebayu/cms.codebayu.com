import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { getUserSession } from '@/lib/auth'
import { cn } from '@/lib/utils'
import Sidebar from '@/components/elements/sidebar'
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
  const session = await getUserSession()
  return (
    <>
      <html lang="en">
        <head />
        <body className={cn('flex', inter.className)}>
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
          <GlobalDialog />
          <Sidebar />
          <main className="relative flex min-h-screen w-full flex-col bg-[#F9FAFF] dark:bg-neutral-900 dark:text-neutral-200">
            <div className="p-16">
              <div className="flex gap-2 text-2xl font-medium">
                <h2 className="pb-8 text-2xl font-medium capitalize text-neutral-800 dark:text-neutral-200">
                  Hello {session?.user.name}
                </h2>
                <div className="animate-waving-hand">👋</div>
              </div>
              {children}
            </div>
          </main>
        </body>
      </html>
    </>
  )
}
