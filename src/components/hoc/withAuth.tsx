import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-hot-toast';

import api from '@/lib/axios';
import { getToken, removeToken } from '@/lib/cookie';

import FullPageLoader from '@/components/FullPageLoader';

import useAuthStore from '@/store/useAuthStore';

import { ApiResponse } from '@/types/api';
import { Role, User } from '@/types/entities/user';

export interface WithAuthProps {
  user: User;
}

const HOME_ROUTE = '/';
const LOGIN_ROUTE = '/login';

const hasPermission = (user: User | null, role: Array<(typeof Role)[number]>) =>
  user && role.includes(user.role);

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T extends WithAuthProps = WithAuthProps>(
  Component: React.ComponentType<T>,
  routePermission: 'auth' | Array<(typeof Role)[number]>
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    const checkAuth = React.useCallback(() => {
      const token = getToken();
      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          const res = await api.get<ApiResponse<User>>('/me');

          login({
            ...res.data.data,
            token: token + '',
          });
        } catch (err) {
          removeToken();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);

    React.useEffect(() => {
      // run checkAuth every page visit
      checkAuth();

      // run checkAuth every focus changes
      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          // Prevent authenticated user from accessing auth or other role pages
          if (
            routePermission === 'auth' ||
            !hasPermission(user, routePermission)
          ) {
            if (query?.redirect) {
              router.replace(query.redirect as string);
            } else {
              if (routePermission !== 'auth') {
                toast.error('Anda tidak memiliki akses ke halaman ini', {
                  id: 'unauthorized',
                });
              }
              router.replace(HOME_ROUTE);
            }
          }
        } else {
          // Prevent unauthenticated user from accessing protected pages
          if (routePermission !== 'auth') {
            router.replace(
              `${LOGIN_ROUTE}?redirect=${router.asPath}`,
              `${LOGIN_ROUTE}`
            );
          }
        }
      }
    }, [isAuthenticated, isLoading, query, router, user]);

    if (
      // If unauthenticated user want to access protected pages
      ((isLoading || !isAuthenticated) && routePermission !== 'auth') ||
      ((isLoading || isAuthenticated) &&
        routePermission !== 'auth' &&
        !hasPermission(user, routePermission))
    ) {
      return <FullPageLoader />;
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
