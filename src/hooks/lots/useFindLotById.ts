import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Lot from '@/interfaces/Lot';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Find a lot by id
 */
const useFindLotById = ({
  id,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<Lot | undefined> => {
  const queryKey = [key ?? `lot-${id}`];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/lots/${id}`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { lots } =
    (response?.data as unknown as {
      lots: Lot | undefined;
    }) ?? {};

  return {
    data: lots,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindLotById;
