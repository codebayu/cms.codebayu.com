import { navItems } from '@/constants/nav'
import NavItem from './nav-item'

export default function Sidebar() {
  return (
    <aside className="z-10 flex h-full min-h-screen w-80 flex-col justify-between bg-white px-7 py-9 shadow-[rgba(226,236,249,_0.5)_6px_0px_16px] dark:bg-neutral-950 dark:shadow-neutral-900">
      <div>
        <div className="mb-16 flex items-center gap-4">
          {/* <Image src="/image/logo.png" width={40} height={40} alt="happykids" priority /> */}
          <h1 className="text-2xl font-semibold text-neutral-800 dark:text-white">Dashboard</h1>
        </div>
        <nav className="text-gray-mute space-y-3 dark:text-neutral-200">
          {navItems.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  )
}
