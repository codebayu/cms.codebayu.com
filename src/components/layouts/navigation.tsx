'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { navItems } from '@/constants/nav'
import { IUser } from '@/use-cases/users/types'
import { cn } from '@/lib/utils'
import SigninButton from '../elements/auth-button'
import { Button } from '../ui/button'

export default function Navigation({ user }: { user: IUser }) {
  const segment = useSelectedLayoutSegment()
  return (
    <nav className="flex w-full items-center justify-between p-2 lg:px-20">
      <div className="p-1 ">
        <div className="flex space-x-8">
          {navItems.map(item => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="link"
                size="lg"
                className={cn(item.segment === segment ? 'font-extrabold' : '', 'justify-start px-0 py-0')}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <SigninButton user={user} />
    </nav>
  )
}
