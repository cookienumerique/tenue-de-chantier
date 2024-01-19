import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';

const useRedirectionPhpCAS = () => {
  const router = useRouter();
  const { isLogged } = useAuthentification();

  useEffect(() => {
    if (
      window &&
      !isLogged &&
      router?.pathname !== '/authentification'
    ) {
      if (process?.env.NEXT_PUBLIC_APP_ENV === 'dev') {
        window.location.href = `${process.env.NEXT_PUBLIC_APP_HOST}/authentification?ticket=fake-ticket`;
      } else {
        router
          ?.push(
            `${process.env.NEXT_PUBLIC_APP_PHP_CAS_HOST}?service=${process.env.NEXT_PUBLIC_APP_HOST}/authentification`
          )
          .then((r) => r);
      }
    }
  }, [router, isLogged]);
};
export default useRedirectionPhpCAS;
