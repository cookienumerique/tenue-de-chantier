import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import InfractionLot from '@/interfaces/InfractionLot';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Find a lot by id
 */
const useFindLotById = ({
  id: uuid,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<
  InfractionLot | undefined
> => {
  const queryKey = [key ?? `infractions-lots-${uuid}`];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots/${uuid}`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { infractions_lots } =
    (response?.data as unknown as {
      infractions_lots: InfractionLot | undefined;
    }) ?? {};

  return {
    data: infractions_lots,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindLotById;
