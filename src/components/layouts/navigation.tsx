'use client';

import { navItems } from '@/constants/nav';
import { Button } from '../ui/button';
import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import SigninButton from '../elements/auth-button';
import { cn } from '@/lib/utils';
import { IUser } from '@/use-cases/users/types';

export default function Navigation({ user }: { user: IUser }) {
  const segment = useSelectedLayoutSegment();
  return (
    <nav className="flex justify-between items-center p-2 lg:px-20 w-full">
      <div className="p-1 ">
        <div className="space-x-8 flex">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant="link"
                size="lg"
                className={cn(
                  item.segment === segment ? 'font-extrabold' : '',
                  'justify-start px-0 py-0'
                )}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <SigninButton user={user} />
    </nav>
  );
}
