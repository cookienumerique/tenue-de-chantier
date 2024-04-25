import { useRouter } from 'next/router';
import { useCallback } from 'react';

const usePhpCAS = () => {
  const router = useRouter();

  /**
   * @description Redirect to the phpCAS login page
   */
  const redirectToLoginPage = useCallback(async () => {
    // If we are in dev mode, we fake the ticket, because the ticket won't be verified
    if (process?.env.NEXT_PUBLIC_APP_ENV === 'dev') {
      return router.push(
        `${process.env.NEXT_PUBLIC_APP_HOST}/authentification?ticket=fake-ticket`
      );
    } else {
      // If we are in prod mode, we redirect to the php cas server login page
      return router?.push(
        `${process.env.NEXT_PUBLIC_APP_PHP_CAS_HOST}/login?service=${process.env.NEXT_PUBLIC_APP_HOST}/authentification`
      );
    }
  }, [router]);

  return { redirectToLoginPage };
};

export default usePhpCAS;
