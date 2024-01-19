import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Utilisateur from '@/interfaces/Utilisateur';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Validate ticket phpCAS
 */
const useValidateTicketPhpCAS = ({
  ticket,
}: {
  ticket: string | null;
}): FindByIdReturn<{
  utilisateur: Utilisateur | undefined;
  token: string;
}> => {
  const queryKey = ['ticket-php-cas'];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/authentification/login?ticket=${ticket}`
      );
    },
    { enabled: !!ticket, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { utilisateur, token } =
    (data as unknown as {
      utilisateur: Utilisateur | undefined;
      token: string;
    }) ?? {};

  return {
    data: { utilisateur, token },
    isLoading,
    isError,
    invalidate,
  };
};

export default useValidateTicketPhpCAS;
