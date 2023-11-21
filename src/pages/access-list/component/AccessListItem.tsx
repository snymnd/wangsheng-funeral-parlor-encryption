import { CheckCheck, Timer, X } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';

import clsxm from '@/lib/clsxm';

import ButtonLink from '@/components/links/ButtonLink';
import Tag from '@/components/tag/Tag';
import Typography from '@/components/typography/Typography';

import { RequestAccess } from '@/types/entities/access';

type AccessListItemProps = {
  request: RequestAccess;
} & React.ComponentPropsWithoutRef<'div'>;

type StatusAttributes = {
  [key in 0 | 1 | 2]: {
    color: 'primary' | 'success' | 'warning' | 'danger';
    label: 'Waiting Access' | 'Approved Access' | 'Rejected Access';
    icon: IconType;
  };
};

const statusAttributes: StatusAttributes = {
  0: {
    color: 'warning',
    label: 'Waiting Access',
    icon: Timer,
  },
  1: {
    color: 'danger',
    label: 'Rejected Access',
    icon: X,
  },
  2: {
    color: 'success',
    label: 'Approved Access',
    icon: CheckCheck,
  },
};

export default function AccessListItem({
  className,
  request,
  ...rest
}: AccessListItemProps) {
  const { color, label, icon } = statusAttributes[request.status];

  return (
    <div
      className={clsxm(
        ' flex flex-wrap items-center justify-between gap-2 rounded-lg bg-base-800 p-3',
        className
      )}
      {...rest}
    >
      <div className='flex w-full justify-between gap-2 sm:w-fit sm:justify-normal'>
        <Typography variant='b1' color='secondary'>
          username:{' '}
        </Typography>
        <Typography variant='b1'>{request.target_user.username}</Typography>
      </div>
      <hr className='my-1 block w-full border border-white sm:hidden sm:w-fit' />
      <div className='ml-auto space-x-2'>
        <Tag size='base' leftIcon={icon} color={color}>
          {label}
        </Tag>

        {request.status === 2 && (
          <ButtonLink
            href={`profile/${request.target_user.username}`}
            className='h-fit text-white'
          >
            Go To Profile
          </ButtonLink>
        )}
        {/* {request.status === 1 && (
          <IconButton
            icon={RefreshCcw}
            title='re-request access'
            variant='outline'
            className='h-fit text-white'
          />
        )} */}
      </div>
    </div>
  );
}
