import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import { ApiResponse } from '@/types/api';
import { UserResponse } from '@/types/entities/user';

type RequestAccessBody = {
  username: string;
};
export const useRequestAccessMutation = () => {
  const result = useMutationToast<unknown, RequestAccessBody>(
    useMutation((data) => {
      return api.post(`/request/${data.username}`);
    }),
    {
      success: 'Request Access Success',
    }
  );

  return {
    ...result,
  };
};

type InsertKeyBody = {
  username: string;
  key: string;
};
export const useInsertKeyMutation = () => {
  const result = useMutationToast<
    ApiResponse<ApiResponse<UserResponse>>,
    InsertKeyBody
  >(
    useMutation((data) => {
      return api.post(`/profile/${data.username}`, { key: data.key });
    }),
    {
      success: 'Key access correct, redirecting you...',
    }
  );

  return {
    ...result,
  };
};
