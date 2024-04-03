import Link from 'next/link'
import { GithubRepository } from '@/constants/nav'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

export default async function HomePage() {
  return (
    <div className="flex w-full items-center justify-center">
      <div>
        <h1 className="mr-2 text-4xl font-bold text-neutral-800">Hi!</h1>
        <p className="mb-6 text-neutral-700">sorry but only the authenticated users can enjoy the CMS site :v</p>

        <Link href={GithubRepository} target="_blank">
          <GitHubLogoIcon width="25" height="25" />
        </Link>
      </div>
    </div>
  )
}
