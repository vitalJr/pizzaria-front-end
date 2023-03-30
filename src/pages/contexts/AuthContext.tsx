import { createContext, ReactNode, useState, useEffect } from 'react';
import Router from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { AxiosError } from 'axios';
import SessionService from '@/services/user/SessionService';
import { toast } from 'react-toastify';
import UserService from '@/services/user/UserService';
import { api } from '@/services/apiClient';

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  token: string;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, '@camilo.token');
    Router.push('/');
  } catch (error) {
    console.log('Error ao deslogar');
  }
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const [token, setToken] = useState('');
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@camilo.token': token } = parseCookies();
    if (token) {
      api
        .get(`http://localhost:3333/me/${token}`)
        .then((response) => {
          const u = response.data as UserProps;
          if (!u) {
            signOut();
          } else {
            setUser({ email: u.email, id: u.id, name: u.name });
          }
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const session = await SessionService.login({ email, password });

      setUser({
        id: session.user._id,
        email: session.user.email,
        name: session.user.name,
      });

      setToken(session.token);

      setCookie(undefined, '@camilo.token', session.token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      toast.success('Logged with success.');

      Router.push('/dashboard');
    } catch (e) {
      const responseError = e as AxiosError;
      toast.error('Error with the login');
      console.log({ responseError });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
