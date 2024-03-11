import { useMutation } from '@tanstack/react-query';
import Axios, { AxiosResponse } from 'axios';

import useToastSuccess from '@/hooks/toast/useToastSuccess';
import Lot from '@/interfaces/Lot';
import MutationProps from '@/types/query/MutationProps';

export type CreateInfractionLotPayload = {
  lotId: number | string;
  infractionId: number | string;
  urgence: string;
  dateButoir: string;
  description: string;
  mesuresCorrectives: string;
};

export type CreationInfractionLotResponse =
  AxiosResponse<{ infractions_lot: Lot }>;
/**
 * @description Création d'une infraction lot
 */
const useCreateInfractionLot = (
  props?: MutationProps<{ infractions_lots: Lot }>
) => {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastSuccess = useToastSuccess();
  return useMutation(
    // @ts-expect-error todo
    (payload: CreateInfractionLotPayload) => {
      return Axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/infractions-lots`,
        payload
      );
    },
    {
      onError: (error) => {
        callbackOnError(error);
      },
      onSuccess: async (data: {
        infractions_lots: Lot;
      }) => {
        toastSuccess({
          title: 'Création réussie',
          description:
            "L'infraction a été créée avec succès",
        });
        return callbackOnSuccess(data);
      },
    }
  );
};

export default useCreateInfractionLot;
