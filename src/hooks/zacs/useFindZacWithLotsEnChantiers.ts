import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Zac from '@/interfaces/Zac';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Retrieve zac with lots en chantiers
 */
const useFindZacWithLotsEnChantiers = ({
  enabled = true,
}: FindListProps = {}): FindListReturn<Zac[]> => {
  const queryKey = ['zacs-with-lots-en-chantiers'];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () =>
      (await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/zacs/zacs-with-lots-en-chantiers`
      )) ?? {},
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { zacs } =
    (response?.data as unknown as {
      zacs: Zac[] | undefined;
    }) ?? {};
  return {
    data: zacs,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindZacWithLotsEnChantiers;
