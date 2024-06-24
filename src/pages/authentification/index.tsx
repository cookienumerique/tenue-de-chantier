import { Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';
import { useEffect } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';
import { useDocumentTitle } from '@/hooks/app/useDocumentTitle';
import useValidateTicketPhpCAS from '@/hooks/authentification/useValidateTicketPhpCAS';

const AuthenticatePage = (): ReactElement => {
  const queryParams = useSearchParams();
  const ticket = queryParams?.get('ticket');
  const { data, isLoading, isError } =
    useValidateTicketPhpCAS({
      ticket,
    });
  const { utilisateur, token } = data ?? {};
  const { login } = useAuthentification();

  useEffect(() => {
    login({ utilisateur, token });
  }, [utilisateur, token, login]);

  useDocumentTitle('Authentification');

  if (isLoading)
    return <Text>Authentification en cours ...</Text>;

  if (isError)
    return (
      <Text>
        Une erreur est survenur lors de
        l&apos;authentification
      </Text>
    );

  return <></>;
};

export default AuthenticatePage;
