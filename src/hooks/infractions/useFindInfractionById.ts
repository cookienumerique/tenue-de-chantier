import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Infraction from '@/interfaces/Infraction';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Find an infraction by id
 */
const useFindInfractionById = ({
  id,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<
  Infraction | undefined
> => {
  const queryKey = [key ?? `infraction-${id}`];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions/${id}`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { infractions } =
    (response?.data as unknown as {
      infractions: Infraction | undefined;
    }) ?? {};

  return {
    data: infractions,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindInfractionById;
