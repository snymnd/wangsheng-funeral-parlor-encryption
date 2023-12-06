import { useQueryClient } from '@tanstack/react-query';
import { CheckCheck, X } from 'lucide-react';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';

import { useResponseAccessMutation } from '@/pages/notification/hook/mutation';

import { RequestAccess } from '@/types/entities/access';

type NotificationListItemProps = {
  request: RequestAccess;
  type: 'profile' | 'file';
} & React.ComponentPropsWithoutRef<'div'>;

export default function NotificationListItem({
  type,
  className,
  request,
  ...rest
}: NotificationListItemProps) {
  const queryClient = useQueryClient();
  const { mutateAsync: responseAccess } = useResponseAccessMutation();

  const handleApprove = (status: number) => {
    responseAccess({
      notificationId: request.id,
      permission_status: status,
      type: type,
    }).then(() =>
      queryClient.invalidateQueries([`/request/${type}/list?dir=1&status=0`])
    );
  };

  return (
    <div
      className={clsxm(
        'flex flex-wrap items-center justify-between gap-2 rounded-lg bg-base-800 p-3',
        className
      )}
      {...rest}
    >
      <div className='flex w-full gap-2 sm:w-fit sm:justify-normal'>
        <Typography variant='b1' color='secondary'>
          <span className='text-white'>{request.source_user.username}</span>{' '}
          requesting access to your {type}
        </Typography>
      </div>
      <hr className='my-1 block w-full border border-white sm:hidden sm:w-fit' />
      <div className='ml-auto space-x-2'>
        <Button
          leftIcon={CheckCheck}
          onClick={() => handleApprove(2)}
          variant='success'
        >
          Approve
        </Button>
        <Button leftIcon={X} onClick={() => handleApprove(1)} variant='danger'>
          Reject
        </Button>
      </div>
    </div>
  );
}
