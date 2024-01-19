import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';

const useRedirectionPhpCAS = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ticket = searchParams.get('ticket');
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
            `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/authentification/login?ticket=${ticket}`
          )
          .then((r) => r);
      }
    }
  }, [router, ticket, isLogged]);
};
export default useRedirectionPhpCAS;
