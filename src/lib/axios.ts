import axios, { AxiosError } from 'axios';
import { CookieValueTypes, getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';

import { getToken } from '@/lib/cookie';

import { JWT_TOKEN_KEY } from '@/constant/cookie';
import { BASE_URL } from '@/constant/env';

import { UninterceptedApiError } from '@/types/api';

const isServer = () => {
  return typeof window === 'undefined';
};
let context = <GetServerSidePropsContext>{};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use(function (config) {
  if (config.headers) {
    let token: CookieValueTypes;

    if (isServer()) {
      if (!context)
        throw 'Api Context not found. You must call `setApiContext(context)` before calling api on server-side';

      /** Get cookies from context if server side */
      getCookie(JWT_TOKEN_KEY, { req: context.req, res: context.res });
    } else {
      token = getToken();
    }

    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    // parse error
    if (error.response?.data.message) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.message === 'string'
                ? error.response.data.message
                : Object.values(error.response.data.message)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

/**
 * Must be set when calling api on server side
 */
export const setApiContext = (_context: GetServerSidePropsContext) => {
  context = _context;
  return;
};

export default api;
