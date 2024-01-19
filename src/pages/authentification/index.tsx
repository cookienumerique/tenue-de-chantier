import { Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import type { ReactElement } from 'react';

import { useAuthentification } from '@/context/AuthentificationProvider';
import useValidateTicketPhpCAS from '@/hooks/authentification/useValidateTicketPhpCAS';

const LoginPage = (): ReactElement => {
  const queryParams = useSearchParams();
  const ticket = queryParams?.get('ticket');
  const { data, isLoading, isError } =
    useValidateTicketPhpCAS({
      ticket,
    });
  const { utilisateur, token } = data ?? {};
  const { login } = useAuthentification();

  if (isLoading)
    return <Text>Authentification en cours ...</Text>;

  if (isError)
    return (
      <Text>
        Une erreur est survenur lors de
        l&apos;authentification
      </Text>
    );

  login({ utilisateur, token });

  return <></>;
};

export default LoginPage;
