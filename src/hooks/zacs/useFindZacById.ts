import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Zac from '@/interfaces/Zac';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Find a Zac by id
 */
const useFindZacById = ({
  id,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<Zac | undefined> => {
  const queryKey = [key ?? `zac-${id}`];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/zacs/${id}`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { zacs } =
    (response?.data as unknown as {
      zacs: Zac | undefined;
    }) ?? {};

  return {
    data: zacs,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindZacById;
