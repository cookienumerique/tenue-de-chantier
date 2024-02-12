import { useMutation } from '@tanstack/react-query';
import Axios, { AxiosResponse } from 'axios';

import useToastSuccess from '@/hooks/toast/useToastSuccess';
import InfractionLot from '@/interfaces/InfractionLot';
import MutationProps from '@/types/query/MutationProps';

export type UpdateInfractionLotPayload = {
  infractionLotId: string;
  statut: string;
};

/**
 * @description Update infraction lot
 */
const useUpdateInfractionLot = (
  props?: MutationProps<
    AxiosResponse<{ infraction_lot: InfractionLot }>
  >
) => {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastSuccess = useToastSuccess();
  return useMutation(
    (payload: UpdateInfractionLotPayload) => {
      return Axios.put(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots/${payload?.infractionLotId}`,
        payload
      );
    },
    {
      onError: (error) => {
        callbackOnError(error);
      },
      onSuccess: async (
        response: AxiosResponse<{
          infraction_lot: InfractionLot;
        }>
      ) => {
        toastSuccess({
          title: 'Mise à jour réussie',
          description:
            "L'infraction a été mise à jour avec succès",
        });
        return callbackOnSuccess(response);
      },
    }
  );
};

export default useUpdateInfractionLot;
