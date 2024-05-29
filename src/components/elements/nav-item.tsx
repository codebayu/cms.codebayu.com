'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  href: string
  segment: string | null
  icon: React.ReactNode
}

export default function NavItem({ name, href, icon, segment }: Props) {
  const currentSegment = useSelectedLayoutSegment()
  return (
    <Link
      href={href}
      className={cn(
        currentSegment === segment
          ? 'bg-lime-500 text-white shadow-md dark:bg-lime-400 dark:text-black'
          : 'hover:bg-lime-500/5 dark:hover:bg-neutral-900',
        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm'
      )}
    >
      <div>{icon}</div>
      <span>{name}</span>
    </Link>
  )
}
