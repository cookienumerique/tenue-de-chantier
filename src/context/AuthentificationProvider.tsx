// AuthentificationContext.js
import { useRouter } from 'next/router';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Utilisateur | null>(
    null
  );
  const isLogged = !!token && !!user;

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
    if (isLogged || !utilisateur || !token) return;
    setToken(token);
    window.sessionStorage.setItem('token', token);
    setUser(utilisateur);
    router?.push('/');
  };

  // Value to be provided by the context
  const contextValue = {
    login,
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
