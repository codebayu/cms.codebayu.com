'use client'

import { signIn, signOut } from 'next-auth/react'
import { User } from '@/constants/user'
import { Button } from '../ui/button'

export default function AuthButton({ user }: { user: User }) {
  function handleClick() {
    if (user) return signOut()
    signIn()
  }
  return (
    <div>
      <Button onClick={handleClick}>{user ? 'Sign out' : 'Sign in'}</Button>
    </div>
  )
}
