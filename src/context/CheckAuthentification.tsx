import useRedirectionPhpCAS from '@/hooks/authentification/useRedirectionPhpCAS';

export const CheckAuthentification = () => {
  useRedirectionPhpCAS();
  return null;
};
