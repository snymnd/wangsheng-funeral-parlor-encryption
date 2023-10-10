import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { File, FileType } from '@/types/entities/file';

//#region  //*=========== get file by type ===========
export function useGetFileQuery(
  type: FileType,
  options?: UseQueryOptions<File[], AxiosError<AxiosError>>
) {
  const results = useQuery<File[], AxiosError<AxiosError>>(
    [`/files/${type}`],
    options
  );
  return results;
}
//#endregion  //*======== get file by type ===========
