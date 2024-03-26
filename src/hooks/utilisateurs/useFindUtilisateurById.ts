import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Utilisateur from '@/interfaces/Utilisateur';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Rechercher un utilisteur par id
 */
const useFindUtilisateurById = ({
  id,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<
  Utilisateur | undefined
> => {
  const queryKey = [key ?? `utilisateur-${id}`];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/utilisateurs/${id}`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { utilisateurs } =
    (response?.data as unknown as {
      utilisateurs: Utilisateur | undefined;
    }) ?? {};

  return {
    data: utilisateurs,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindUtilisateurById;
