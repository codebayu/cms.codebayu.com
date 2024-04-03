'use client'

import { signIn, signOut } from 'next-auth/react'
import { IUser } from '@/use-cases/users/types'
import { Button } from '../ui/button'

export default function AuthButton({ user }: { user: IUser }) {
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
