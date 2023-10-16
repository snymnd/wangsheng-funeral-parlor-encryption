import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

export type RegisterBody = {
  username: string;
  password: string;
  name: string;
  phone_number: string;
  gender: string;
  religion: string;
  nationality: string;
  address: string;
  birth_info: string;
};

export const useRegisterMutation = () => {
  const results = useMutationToast<unknown, RegisterBody>(
    useMutation((data) => {
      return api.post('/register', data);
    }),
    {
      success: 'Registration Success',
    }
  );
  return {
    ...results,
  };
};
