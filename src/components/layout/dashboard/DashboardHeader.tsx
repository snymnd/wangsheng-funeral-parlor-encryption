import { Popover, Transition } from '@headlessui/react';
import { Menu, X } from 'lucide-react';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa';

import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';

import DefaultAvatar from '~/svg/DefaultAvatar.svg';

const userMenu = [{ name: 'Profil', href: '#profile', icon: FaRegUser }];

export default function DashboardHeader({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

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
          <UnstyledLink href='/' className='flex'>
            <span className='sr-only'>Workflow</span>
            <Logo className='w-16' />
          </UnstyledLink>
        </div>
        <div className='flex gap-x-8 lg:flex-1 lg:items-center lg:justify-between'>
          <div className='flex flex-1 items-center justify-end gap-x-4 md:gap-x-6'>
            {isAuthenticated ? (
              <>
                <Popover className='relative'>
                  <Popover.Button className='hover:ring-secondary-200 flex h-10 w-10 rounded-full hover:ring-2 focus:border-none focus:!outline-none '>
                    <span className='sr-only'>Open user menu</span>
                    <DefaultAvatar className='h-10 w-10 text-neutral-white' />
                  </Popover.Button>
                  <Transition
                    as={React.Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute right-0 top-10 z-20 mt-3 w-52 rounded-md border-2 border-base-200 bg-base-1000 p-4 shadow-md'>
                      <div className='mt-3'>
                        <div className='flex flex-col gap-y-2'>
                          {userMenu.map((item) => (
                            <UnstyledLink
                              key={item.name}
                              href={item.href}
                              className='flex items-center gap-x-2 hover:font-semibold'
                            >
                              <item.icon className='text-secondary-300 h-5 w-5 flex-shrink-0 fill-primary-600 text-primary-500' />
                              {item.name}
                            </UnstyledLink>
                          ))}
                          <button
                            className='flex items-center gap-x-2 text-left hover:font-semibold'
                            onClick={() => setIsAuthenticated(false)}
                          >
                            <BiLogOut className='text-secondary-300 h-5 w-5 text-primary-500' />
                            Keluar
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </>
            ) : (
              <ButtonLink
                href='#'
                variant='outline'
                className='bg-base-1000'
                onClick={() => setIsAuthenticated(true)}
              >
                Masuk
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
}
