// AuthentificationContext.js
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import Utilisateur from '@/interfaces/Utilisateur';

interface AuthentiticationContextProps {
  children: ReactNode;
}

interface AuthentiticationState {
  login: ({
    utilisateur,
    token,
  }: {
    utilisateur: Utilisateur | undefined;
    token: string | undefined;
  }) => void;
  logout: () => void;
  needAuthentification: boolean;
  user: Utilisateur | null;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<Utilisateur | null>>;
}

// Create the AuthentificationContext
const AuthentificationContext =
  createContext<AuthentiticationState>({
    login: () => {},
    logout: () => {},
    needAuthentification: false,
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {},
  });

// Create a custom hook to use the AuthentificationContext
export const useAuthentification = () => {
  return useContext(AuthentificationContext);
};

// AuthProvider component to wrap your app and provide authentication context
export const AuthentificationProvider = ({
  children,
}: AuthentiticationContextProps) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [needAuthentification, setNeedAuthentification] =
    useState<boolean>(false);
  const [user, setUser] = useState<Utilisateur | null>(
    null
  );

  useEffect(() => {
    if (window) {
      if (!token) {
        setNeedAuthentification(true);
      }
      setNeedAuthentification(false);
    }
  }, [token]);

  /**
   * @description Login the user
   */
  const login = ({
    utilisateur,
    token,
  }: {
    token: string | undefined;
    utilisateur: Utilisateur | undefined;
  }) => {
    if (!utilisateur || !token) return;
    setToken(token);
    window.sessionStorage.setItem('token', token);
    setUser(utilisateur);
    router?.push('/');
  };

  const logout = () => {
    window.sessionStorage.removeItem('token');
    router
      .push(
        `${process.env.NEXT_PUBLIC_APP_PHP_CAS_HOST}/logout`
      )
      .then((r) => r);
  };

  // Value to be provided by the context
  const contextValue = {
    login,
    logout,
    needAuthentification,
    token,
    user,
    setToken,
    setUser,
  };

  return (
    <AuthentificationContext.Provider
      value={contextValue}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
