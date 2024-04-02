import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Utilisateur from '@/interfaces/Utilisateur';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description retrieves users who have created at least one offense
 */
const useFindAllUtilisateursActive = ({
  enabled = true,
  queryParameters,
  key,
}: FindListProps = {}): FindListReturn<Utilisateur[]> => {
  const queryKey = key ?? [
    'utilisateurs',
    queryParameters?.toString(),
  ];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/utilisateurs/active`,
        {
          params: queryParameters,
        }
      ),
    { enabled, refetchOnMount: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { utilisateurs } =
    (response?.data as unknown as {
      utilisateurs: Utilisateur[] | undefined;
    }) ?? {};

  return {
    data: utilisateurs,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindAllUtilisateursActive;
