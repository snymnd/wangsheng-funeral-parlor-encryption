import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import { setToken } from '@/lib/cookie';
import useMutationToast from '@/hooks/toast/useMutationToast';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { UserResponse } from '@/types/entities/user';

type LoginBody = {
  username: string;
  password: string;
};

export const useLoginMutation = () => {
  const storeLogin = useAuthStore.useLogin();

  const result = useMutationToast<UserResponse, LoginBody>(
    useMutation((data) => {
      let tempToken: string;

      return api
        .post('/login', data)
        .then((res) => {
          const { token } = res.data.data;
          tempToken = token;
          setToken(token);

          return api.get<ApiResponse<UserResponse>>('/profile');
        })
        .then((user) => {
          const data = user.data.data;

          storeLogin({
            ...data,
            token: tempToken,
          });

          return data;
        });
    }),
    {
      success: 'Login Success',
    }
  );

  return {
    ...result,
  };
};
