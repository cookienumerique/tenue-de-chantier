import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Lot from '@/interfaces/Lot';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Query for retrieving all Lot
 */
const useFindAllLot = ({
  enabled = true,
  queryParameters,
}: FindListProps = {}): FindListReturn<Lot[]> => {
  const queryKey = ['lots', queryParameters?.toString()];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/lots`,
        {
          params: queryParameters,
        }
      ),
    {
      enabled,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
    }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { lots } =
    (response?.data as unknown as {
      lots: Lot[] | undefined;
    }) ?? {};

  return {
    data: lots,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindAllLot;
