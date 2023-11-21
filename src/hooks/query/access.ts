import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ApiResponse } from '@/types/api';
import { RequestAccess } from '@/types/entities/access';

//#region  //*=========== get file by type ===========

type NotificationResponse = ApiResponse<RequestAccess[]>;

export function useGetNotificationQuery(
  filter: string,
  options?: UseQueryOptions<NotificationResponse, AxiosError<AxiosError>>
) {
  const results = useQuery<NotificationResponse, AxiosError<AxiosError>>(
    [`/request/list?${filter}`],
    options
  );
  return results;
}
//#endregion  //*======== get file by type ===========
