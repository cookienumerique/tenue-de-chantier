import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import ActionInfractionEnum from '@/enums/ActionInfractionEnum';
import FindByIdProps from '@/types/query/FindByIdProps';
import FindByIdReturn from '@/types/query/FindByReturn';

/**
 * @description Retrieve a list of actions possibles by infraction lot id
 */
const useFindActionsByInfractionLotId = ({
  id: uuid,
  key,
  enabled,
}: FindByIdProps): FindByIdReturn<
  ActionInfractionEnum[] | undefined
> => {
  const queryKey = [
    key ?? `actions-infractions-lots-${uuid}`,
  ];
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    queryKey,
    async () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots/${uuid}/actions`
      );
    },
    { enabled, retry: false }
  );

  const invalidate = () =>
    queryClient.invalidateQueries(queryKey);

  const { actions } =
    (data as unknown as {
      actions: ActionInfractionEnum[] | undefined;
    }) ?? {};

  return {
    data: actions,
    isLoading,
    isError,
    invalidate,
  };
};

export default useFindActionsByInfractionLotId;
