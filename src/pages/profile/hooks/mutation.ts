import { useMutation } from '@tanstack/react-query';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import { FileWithPreview } from '@/types/dropzone';
import { FileType } from '@/types/entities/file';

export type UploadBody = {
  type: FileType;
  file: FileWithPreview | null;
};

export const useUploadFileMutation = () => {
  const results = useMutationToast<string, FormData>(
    useMutation((data) => {
      return api.post('/file', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }),
    {
      success: 'File/image Upload Success',
    }
  );
  return {
    ...results,
  };
};
