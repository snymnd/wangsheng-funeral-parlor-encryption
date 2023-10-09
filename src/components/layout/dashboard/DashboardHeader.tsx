import { Popover } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import * as React from 'react';

import IconButton from '@/components/buttons/IconButton';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';

export default function DashboardHeader({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Popover className='fixed z-30 w-full bg-base-900 px-3'>
      <div className='flex min-h-[3.5rem] w-full items-center justify-between gap-2 lg:min-h-[4.5rem] lg:justify-start lg:gap-6'>
        <div className='flex items-center gap-x-2'>
          <IconButton
            icon={isOpen ? X : Menu}
            onClick={() => setIsOpen(!isOpen)}
            className='h-fit text-white'
            iconClassName='h-7 w-7'
            variant='ghost'
          />
        </div>
        <div className='flex gap-x-8 lg:flex-1 lg:items-center lg:justify-between'>
          <div className='flex flex-1 items-center justify-end gap-x-4 md:gap-x-6'>
            <UnstyledLink href='/' className='flex'>
              <span className='sr-only'>Workflow</span>
              <Logo className='w-16' />
            </UnstyledLink>
          </div>
        </div>
      </div>
    </Popover>
  );
}
