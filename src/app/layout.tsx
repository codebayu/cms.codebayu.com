import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getUserSession } from '@/lib/auth'
import { cn } from '@/lib/utils'
import MainLayout from '@/components/elements/main-layout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

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
          <MainLayout name={session?.user?.name}>{children}</MainLayout>
        </body>
      </html>
    </>
  )
}
