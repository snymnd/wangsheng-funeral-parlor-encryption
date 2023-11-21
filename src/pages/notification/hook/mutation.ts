import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

type RequestAccessBody = {
  notificationId: string;
  permission_status: number;
};
export const useResponseAccessMutation = () => {
  const result = useMutationToast<unknown, RequestAccessBody>(
    useMutation((data) => {
      return api.post(`/request/action/${data.notificationId}`, {
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
