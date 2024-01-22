import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';

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
  useEffect(() => {
    const userShouldBeAuthenticated =
      !isLogged && currentURL !== authentificateURL;

    if (window && userShouldBeAuthenticated) {
      // If we are in dev mode, we fake the ticket, because the ticket won't be verified
      if (process?.env.NEXT_PUBLIC_APP_ENV === 'dev') {
        router
          .push(
            `${process.env.NEXT_PUBLIC_APP_HOST}/authentification?ticket=fake-ticket`
          )
          .then((r) => r);
      } else {
        // If we are in prod mode, we redirect to the php cas server login page
        router
          ?.push(
            `${process.env.NEXT_PUBLIC_APP_PHP_CAS_HOST}/login?service=${process.env.NEXT_PUBLIC_APP_HOST}/authentification`
          )
          .then((r) => r);
      }
    }
  }, [currentURL, isLogged, authentificateURL, router]);

  // If we are not logged and we are not on the authentification page, we don't display anything
  if (
    !isLogged &&
    router.pathname !== '/authentification'
  )
    return null;

  return children;
};
