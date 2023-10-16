import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

export type UpadateProfileBody = {
  username: string;
  name: string;
  phone_number: string;
  gender: string;
  religion: string;
  nationality: string;
  address: string;
  birth_info: string;
};

export const useUpdateProfileMutation = () => {
  const results = useMutationToast<unknown, UpadateProfileBody>(
    useMutation((data) => {
      return api.put('/profile', data);
    }),
    {
      success: 'Update Profile Success',
    }
  );
  return {
    ...results,
  };
};
