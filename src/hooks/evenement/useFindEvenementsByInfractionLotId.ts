import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Evenement from '@/interfaces/Evenement';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Find evenements by infraction lot id
 */
const useFindEvenementsByInfractionLotId = ({
  id,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<
  Evenement[] | undefined
> => {
  const queryKey = [
    key ?? `evenements-infractions-lots-${id}`,
  ];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/evenements/infractions-lots/${id}`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { evenements } =
    (response?.data as unknown as {
      evenements: Evenement[] | undefined;
    }) ?? {};

  return {
    data: evenements,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindEvenementsByInfractionLotId;
