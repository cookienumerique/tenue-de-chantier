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
  const router = useRouter();
  const { isLogged } = useAuthentification();
  const authentificateURL = '/authentification';
  const currentURL = router.pathname;
  const isLoginPage = currentURL === authentificateURL;
  const { redirectToLoginPage } = usePhpCAS();

  const userMustBeAuthenticated =
    !isLogged && !isLoginPage;

  useEffect(() => {
    if (userMustBeAuthenticated) {
      redirectToLoginPage().then((r) => r);
    }
  }, [redirectToLoginPage, userMustBeAuthenticated]);

  return children;
};
