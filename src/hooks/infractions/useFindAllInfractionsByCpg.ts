import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Infraction from '@/interfaces/Infraction';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Récupère toutes les infractions d'un CPG
 */
const useFindAllInfractionsByCpg = ({
  enabled,
  queryParams,
  key,
}: FindListProps = {}): FindListReturn<Infraction[]> => {
  const queryKey = key ?? ['infractions'];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions/`,
        {
          params: queryParams,
        }
      );
    },
    { enabled }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { infractions } =
    (data as unknown as {
      infractions: Infraction[] | undefined;
    }) ?? {};

  return {
    data: infractions,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindAllInfractionsByCpg;
