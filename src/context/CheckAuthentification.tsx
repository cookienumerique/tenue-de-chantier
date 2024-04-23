import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';
import usePhpCAS from '@/functions/authentification/usePhpCAS';

type CheckAuthentificateProps = {
  children: ReactNode;
};
export const CheckAuthentification = ({
  children,
}: CheckAuthentificateProps) => {
  const { setToken, token } = useAuthentification();
  const router = useRouter();
  const authentificateURL = '/authentification';
  const currentURL = router.pathname;
  const isLoginPage = currentURL === authentificateURL;
  const { redirectToLoginPage } = usePhpCAS();
  useEffect(() => {
    /// Check the token in storage and set it in the context
    setToken(localStorage.getItem('token'));
  }, [setToken]);

  useEffect(() => {
    if (!token && !isLoginPage) {
      redirectToLoginPage().then((r) => r);
    }
  }, [isLoginPage, redirectToLoginPage, token]);

  return children;
};
