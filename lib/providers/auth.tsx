import axios from 'axios';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Configuration,
  RedirectRequest,
  AccountInfo,
  InteractionStatus,
  IPublicClientApplication
} from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { userHelper, parseJwt } from 'lib/helpers';
import User from 'lib/types/user';
import { PageLoader } from 'partials';

import { setToken } from 'lib/services/auth-slice';

if (!process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_NCSC) {
  throw Error('AUTH_CLIENT_ID_NCSC is not set');
}

if (!process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_CORP) {
  throw Error('AUTH_CLIENT_ID_CORP is not set');
}

if (!process.env.NEXT_PUBLIC_AUTH_AUTHORITY_CORP) {
  throw Error('AUTH_AUTHORITY_CORP is not set');
}

if (!process.env.NEXT_PUBLIC_AUTH_AUTHORITY_NCSC) {
  throw Error('AUTH_AUTHORITY_NCSC is not set');
}

if (!process.env.NEXT_PUBLIC_REDIRECT_ROOT) {
  throw Error('REDIRECT_ROOT is not set');
}

if (!process.env.NEXT_PUBLIC_AUTH_SCOPE_CORP) {
  throw Error('AUTH_SCOPE_CORP is not set');
}

if (!process.env.NEXT_PUBLIC_AUTH_SCOPE_NCSC) {
  throw Error('AUTH_SCOPE_NCSC is not set');
}

const msalConfig = {
  auth: {
    clientId: '',
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_ROOT,
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
};

export const corpMsalConfig: Configuration = {
  ...msalConfig,
  auth: {
    ...msalConfig.auth,
    clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_CORP,
    authority: process.env.NEXT_PUBLIC_AUTH_AUTHORITY_CORP
  }
};

export const ncscMsalConfig: Configuration = {
  ...msalConfig,
  auth: {
    ...msalConfig.auth,
    clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID_NCSC,
    authority: process.env.NEXT_PUBLIC_AUTH_AUTHORITY_NCSC
  }
};

export const corpLoginRequest: RedirectRequest = {
  scopes: [process.env.NEXT_PUBLIC_AUTH_SCOPE_CORP],
  authority: process.env.NEXT_PUBLIC_AUTH_AUTHORITY_CORP
};

export const ncscLoginRequest: RedirectRequest = {
  scopes: [process.env.NEXT_PUBLIC_AUTH_SCOPE_NCSC],
  authority: process.env.NEXT_PUBLIC_AUTH_AUTHORITY_NCSC
};

const emptyUser: User = {
  lsid: 0,
  name: ''
};

const addAuthorizationHeaderToRequests = (token: string) => {
  axios.defaults.headers.common['Authorization'] = token;
};

const getToken = async (
  accounts: AccountInfo[],
  instance: IPublicClientApplication
) => {
  const isCorp =
    localStorage.getItem('clientId') === corpMsalConfig.auth.clientId;
  const { scopes } = isCorp ? corpLoginRequest : ncscLoginRequest;
  const request = {
    scopes,
    account: accounts[0]
  };
  return instance.acquireTokenSilent(request);
};

const getResponse = (
  push: (url: string) => Promise<boolean>,
  loginUrl: string
) => {
  return axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        sessionStorage.setItem('redirectPath', window.location.pathname);
        return push(loginUrl);
      } else {
        return Promise.reject(error);
      }
    }
  );
};

export const AuthContext = createContext<{
  user: User;
  logout?: () => void;
}>({ user: emptyUser });

const AuthProvider: React.FC<React.PropsWithChildren<object>> = ({
  children
}) => {
  const dispatch = useDispatch();
  const { instance, accounts, inProgress } = useMsal();
  const authenticated = useIsAuthenticated();
  const loginUrl = '/auth/login';
  const { pathname, push } = useRouter();
  const [loading, setLoading] = useState(pathname !== loginUrl);
  const [user, setUser] = useState<User>(emptyUser);
  const [userError, setUserError] = useState<string>();

  getResponse(push, loginUrl);

  const logout = () => {
    dispatch(setToken(''));
    setUser(emptyUser);
    instance.logoutRedirect();
  };

  useEffect(() => {
    if (loading && inProgress === InteractionStatus.None) {
      getToken(accounts, instance)
        .then((tokenResponse) => {
          if (tokenResponse) {
            const { accessToken } = tokenResponse;
            addAuthorizationHeaderToRequests(accessToken);
            const parsedToken = parseJwt(accessToken);
            const { lsi } = parsedToken;
            dispatch(setToken(accessToken));
            return userHelper.getUser(lsi).then(setUser).catch(setUserError);
          } else {
            return Promise.reject();
          }
        })
        .catch(() => {
          sessionStorage.setItem('redirectPath', window.location.pathname);
          if (pathname !== loginUrl) return push(loginUrl);
          return Promise.reject();
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loading, inProgress, authenticated, accounts]);

  if (userError) return <p>{userError.toString()}</p>;

  if (loading) return <PageLoader />;

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): { user: User; logout?: () => void } =>
  useContext(AuthContext);

export { AuthProvider, useAuth };

export default AuthProvider;
