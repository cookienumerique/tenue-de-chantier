import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import usePhpCAS from '@/functions/authentification/usePhpCAS';

type CheckAuthentificateProps = {
  children: ReactNode;
};
export const CheckAuthentification = ({
  children,
}: CheckAuthentificateProps) => {
  const router = useRouter();
  const authentificateURL = '/authentification';
  const currentURL = router.pathname;
  const isLoginPage = currentURL === authentificateURL;
  const { redirectToLoginPage } = usePhpCAS();

  useEffect(() => {
    if (!localStorage.getItem('token') && !isLoginPage) {
      console.log('redirect to php cas login page');
      redirectToLoginPage().then((r) => r);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
