import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import api from '@/lib/axios';
import useMutationToast from '@/hooks/toast/useMutationToast';

import { ApiResponse } from '@/types/api';
import { File as FileEntities, FileType } from '@/types/entities/file';

//#region  //*=========== get file by type ===========
export function useGetFileByTypeQuery(
  username: string | undefined,
  type: FileType,
  options?: UseQueryOptions<ApiResponse<FileEntities[]>, AxiosError<AxiosError>>
) {
  const results = useQuery<ApiResponse<FileEntities[]>, AxiosError<AxiosError>>(
    [`/files/${username}?type=${type}`],
    options
  );
  return results;
}
//#endregion  //*======== get file by type ===========

//#region  //*=========== Get File with Auth ===========
// export function useGetFilewithAuthQuery(
//   url: string,
//   options?: UseQueryOptions<ApiResponse<File>, AxiosError<AxiosError>>
// ) {
//   const results = useQuery<ApiResponse<File>, AxiosError<AxiosError>>(
//     [`${url}`],
//     options
//   );
//   // console.log('results', url, results.data);
//   return results;
// }
//#endregion  //*======== Get File with Auth ===========

//#region  //*===========  ===========
export async function getFileQuery(
  urlId: string | undefined
): Promise<string | undefined> {
  if (!urlId) return undefined;
  const blobUrl = await api
    .get(`/file/${urlId}`, {
      responseType: 'blob',
    })
    .then((res) => {
      return URL.createObjectURL(res.data);
    });
  return blobUrl;
}
//#endregion  //*========  ===========

//#region  //*=========== Req Permission File ===========
export type InsertKeyFileBody = {
  fileId: string;
  key: string;
};

export const useInsertKeyFileMutation = () => {
  const result = useMutationToast<
    ApiResponse<ApiResponse<unknown>>,
    InsertKeyFileBody
  >(
    useMutation((data) => {
      return api.post(`/request/file/${data.fileId}`, { key: data.key });
    }),
    {
      success: 'Key access correct, processing...',
    }
  );

  return {
    ...result,
  };
};

//#endregion  //*======== Req Permission File ===========
