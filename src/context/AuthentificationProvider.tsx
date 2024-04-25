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

import usePhpCAS from '@/functions/authentification/usePhpCAS';
import Utilisateur from '@/interfaces/Utilisateur';
import useFindMe from '@/services/useFindMe';

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
  isLogged: boolean;
  user: Utilisateur | null;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<Utilisateur | null>>;
  invalidateUser: () => void;
}

// Create the AuthentificationContext
const AuthentificationContext =
  createContext<AuthentiticationState>({
    login: () => {},
    logout: () => {},
    isLogged: false,
    user: null,
    token: null,
    setToken: () => {},
    setUser: () => {},
    invalidateUser: () => {},
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
  const { redirectToLoginPage } = usePhpCAS();

  // State auth
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Utilisateur | null>(
    null
  );
  const {
    utilisateur,
    invalidate: invalidateUser,
    isError,
  } = useFindMe({ enabled: !!token });

  // Get the user from the API
  useEffect(() => {
    if (isError) {
      redirectToLoginPage().then((r) => r);
      return;
    }
    setUser(utilisateur);
    setToken(token);
  }, [
    setToken,
    isLogged,
    redirectToLoginPage,
    token,
    utilisateur,
    isError,
  ]);

  // Get the token from the local storage
  useEffect(() => {
    if (window && !token) {
      setToken(window?.localStorage?.getItem('token'));
    }
  }, [token]);

  // Check if the user is logged
  useEffect(() => {
    // If the token is in storage, the user is logged
    setIsLogged(!!window?.localStorage?.getItem('token'));
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
    window.localStorage.setItem('token', token);
    setUser(utilisateur);
    router?.push('/');
  };

  const logout = () => {
    window.localStorage.removeItem('token');
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
    isLogged,
    token,
    user,
    setToken,
    setUser,
    invalidateUser,
  };

  return (
    <AuthentificationContext.Provider
      value={contextValue}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
