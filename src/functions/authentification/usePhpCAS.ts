import { useRouter } from 'next/router';

const usePhpCAS = () => {
  const router = useRouter();

  /**
   * @description Redirect to the phpCAS login page
   */
  const redirectToLoginPage = async () => {
    // If we are in dev mode, we fake the ticket, because the ticket won't be verified
    if (
      process?.env.NEXT_PUBLIC_APP_ENV === 'development'
    ) {
      await router
        .push(
          `${process.env.NEXT_PUBLIC_APP_HOST}/authentification?ticket=fake-ticket`
        )
        .then((r) => r);
    } else {
      // If we are in prod mode, we redirect to the php cas server login page
      await router
        ?.push(
          `${process.env.NEXT_PUBLIC_APP_PHP_CAS_HOST}/login?service=${process.env.NEXT_PUBLIC_APP_HOST}/authentification`
        )
        .then((r) => r);
    }
  };

  return { redirectToLoginPage };
};

export default usePhpCAS;
