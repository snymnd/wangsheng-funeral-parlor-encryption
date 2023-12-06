import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import { ApiResponse } from '@/types/api';

export type verifySignMutationResponse = {
  sign_date: Date;
  sign_by: string;
  contact: string;
};

export const useVerifySignMutation = () => {
  const results = useMutationToast<
    ApiResponse<{ data: verifySignMutationResponse }>,
    FormData
  >(
    useMutation((data) => {
      return api.post('/file/verify', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }),
    {
      success: 'File is Signed',
    }
  );
  return {
    ...results,
  };
};
