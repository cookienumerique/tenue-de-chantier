import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import ZacFavoris from '@/interfaces/ZacFavoris';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Retrieve zac favoris
 */
const useFindZacFavoris = ({
  key,
  enabled,
}: FindListProps = {}): FindListReturn<ZacFavoris[]> => {
  const queryKey = [key ?? ['zac-favoris']];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/zac-favoris/me`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { zac_favoris } =
    (data as unknown as {
      zac_favoris: ZacFavoris[] | undefined;
    }) ?? {};

  return {
    data: zac_favoris,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindZacFavoris;
