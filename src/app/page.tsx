import Link from 'next/link'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { githubRepository } from '@/constants/nav'

export default async function HomePage() {
  return (
    <Link href={githubRepository} target="_blank">
      <GitHubLogoIcon width="25" height="25" />
    </Link>
  )
}
