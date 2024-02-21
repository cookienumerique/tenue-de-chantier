import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Utilisateur from '@/interfaces/Utilisateur';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Query for retrieving all utilisateurs
 */
const useFindAllUtilisateurs = ({
  enabled = true,
  queryParameters,
  key,
}: FindListProps = {}): FindListReturn<Utilisateur[]> => {
  const queryKey = key ?? [
    'utilisateurs',
    queryParameters?.toString(),
  ];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/utilisateurs`,
        {
          params: queryParameters,
        }
      ),
    { enabled }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { utilisateurs } =
    (data as unknown as {
      utilisateurs: Utilisateur[] | undefined;
    }) ?? {};

  return {
    data: utilisateurs,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindAllUtilisateurs;
