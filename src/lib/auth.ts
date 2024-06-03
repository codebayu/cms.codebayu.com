import { unstable_noStore } from 'next/cache'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { AuthOptions, DefaultSession, getServerSession } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { AuthenticationError } from '@/utils/error'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async credentials => {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: credentials?.email
          }
        })

        if (!dbUser) {
          throw new Error('no user with email found')
        }

        if (dbUser?.password !== credentials?.password) {
          throw new Error('incorrect password')
        }

        return dbUser
      }
    })
  ],
  callbacks: {
    async jwt({ token }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: token.email as string
        }
      })

      if (!dbUser) {
        throw new Error('no user with email found')
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email
      }
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
      }

      return session
    }
  },
  session: {
    strategy: 'jwt'
  }
} satisfies AuthOptions

export async function getUserSession() {
  unstable_noStore()
  const session = await getServerSession(authConfig)
  return session
}

export async function checkPermission() {
  const session = await getUserSession()
  if (!session) throw new AuthenticationError()
  return session
}
