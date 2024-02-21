import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import Infraction from '@/interfaces/Infraction';
import FindListProps from '@/types/query/FindListProps';
import FindListReturn from '@/types/query/FindListReturn';

/**
 * @description Query for retrieving all Infractions
 */
const useFindAllInfractions = ({
  enabled = true,
}: FindListProps = {}): FindListReturn<Infraction[]> => {
  const queryKey = ['infractions'];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions`
      ),
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

export default useFindAllInfractions;
