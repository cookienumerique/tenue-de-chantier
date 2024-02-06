import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import InfractionLot from '@/interfaces/InfractionLot';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Retrieve infraction_lot by queryParameters
 */
const useFindAllInfractions = ({
  queryParameters,
  key,
  enabled,
}: FindListProps = {}): FindListReturn<
  InfractionLot[]
> => {
  const queryKey = [
    key ?? [
      `infractions-lots`,
      queryParameters?.toString(),
    ],
  ];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots`,
        { params: queryParameters }
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { infractions_lots } =
    (data as unknown as {
      infractions_lots: InfractionLot[] | undefined;
    }) ?? {};

  return {
    data: infractions_lots,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindAllInfractions;
