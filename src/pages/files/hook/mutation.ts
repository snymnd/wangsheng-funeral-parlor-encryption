import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

export const useSignPdfMutation = () => {
  const results = useMutationToast<unknown, { fileId: string }>(
    useMutation((data) => {
      return api.post(`/file/sign/${data.fileId}`);
    }),
    {
      success: 'Pdf Signed Success',
    }
  );
  return {
    ...results,
  };
};
