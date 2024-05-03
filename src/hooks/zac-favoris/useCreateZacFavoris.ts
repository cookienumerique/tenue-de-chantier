import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';

import useToastSuccess from '@/hooks/toast/useToastSuccess';
import MutationProps from '@/types/query/MutationProps';

/**
 * @description Add zac to favoris
 */
const useCreateZacFavoris = (
  props?: MutationProps<void>
) => {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastSuccess = useToastSuccess();
  return useMutation(
    (payload: { zac_id: string }) => {
      return Axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/zac-favoris`,
        payload
      );
    },
    {
      onError: (error) => {
        callbackOnError(error);
      },
      onSuccess: async () => {
        toastSuccess({
          title: 'Création réussie',
          description: 'La ZAC a été ajoutée aux favoris',
        });
        return callbackOnSuccess();
      },
    }
  );
};

export default useCreateZacFavoris;
