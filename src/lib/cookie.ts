import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';

import { JWT_TOKEN_KEY } from '@/constant/cookie';

export const getToken = () => {
  return getCookie(JWT_TOKEN_KEY);
};

export const hasToken = () => {
  return hasCookie(JWT_TOKEN_KEY);
};

export const setToken = (token: string) => {
  setCookie(JWT_TOKEN_KEY, token, {
    path: '/',
  });
};

export const removeToken = () => {
  deleteCookie(JWT_TOKEN_KEY, {
    path: '/',
  });
};
