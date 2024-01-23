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
import findMe from '@/services/FindMe';

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

  // Get the user from the API
  useEffect(() => {
    if (user || !token) return;
    findMe()
      .then(({ utilisateur, token }) => {
        setUser(utilisateur);
        setToken(token);
      })
      .catch(() => redirectToLoginPage());
  }, [isLogged, redirectToLoginPage, token, user]);

  // Get the token from the session storage
  useEffect(() => {
    if (window && !token) {
      setToken(window?.sessionStorage?.getItem('token'));
    }
  }, [token]);

  // Check if the user is logged
  useEffect(() => {
    // If the token is in storage, the user is logged
    setIsLogged(
      !!window?.sessionStorage?.getItem('token')
    );
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
    isLogged,
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
