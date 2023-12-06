import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

type RequestAccessBody = {
  notificationId: string;
  type: 'profile' | 'file';
  permission_status: number;
};
export const useResponseAccessMutation = () => {
  const result = useMutationToast<unknown, RequestAccessBody>(
    useMutation((data) => {
      return api.post(`/request/action/${data.type}/${data.notificationId}`, {
        permission_status: data.permission_status,
      });
    }),
    {
      success: 'Response Access Success',
    }
  );

  return {
    ...result,
  };
};
