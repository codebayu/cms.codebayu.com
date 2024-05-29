import { Component1Icon, CubeIcon, HomeIcon, LightningBoltIcon, MixIcon, RocketIcon } from '@radix-ui/react-icons'

export const navItems = [
  { name: 'Welcome', href: '/', segment: null, icon: <HomeIcon width="20" height="20" /> },
  { name: 'Career', href: '/career', segment: 'career', icon: <RocketIcon width="20" height="20" /> },
  { name: 'Project', href: '/project', segment: 'project', icon: <MixIcon width="20" height="20" /> },
  { name: 'Learn', href: '/learn', segment: 'learn', icon: <CubeIcon width="20" height="20" /> },
  {
    name: 'Service',
    href: '/service',
    segment: 'service',
    icon: <Component1Icon width="20" height="20" />
  },
  {
    name: 'Promotion',
    href: '/promotion',
    segment: 'promotion',
    icon: <LightningBoltIcon width="20" height="20" />
  }
]

export const githubRepository = 'https://github.com/codebayu/cms.codebayu.com'
