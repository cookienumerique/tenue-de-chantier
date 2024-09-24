import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Retrieve the content of the email by infraction id
 */
const useFindContentEmailByInfractionId = ({
  id: uuid,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<
  { email: { subject: string; body: string; cc: string } } | undefined
> => {
  const queryKey = [key ?? `content-email-${uuid}`];
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots/${uuid}/content-email`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const contentEmail =
    (response?.data as unknown as {
      email: { subject: string; body: string; cc: string };
    }) ?? {};

  return {
    data: contentEmail,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindContentEmailByInfractionId;
