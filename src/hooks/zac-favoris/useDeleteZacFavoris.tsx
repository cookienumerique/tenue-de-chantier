import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';

import useToastError from '@/hooks/toast/useToastError';
import useToastSuccess from '@/hooks/toast/useToastSuccess';

type DeleteZacFavorisProps = {
  callbackOnSuccess?: () => void;
  callbackOnError?: () => void;
};

/**
 * @description Delete zac-favoris
 * @param props
 */
export default function useDeleteZacFavoris(
  props: DeleteZacFavorisProps = {}
) {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  return useMutation(
    (id: string) => {
      return Axios.delete(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/zac-favoris/${id}`
      );
    },
    {
      onError: () => {
        callbackOnError();
        toastError({
          title: 'Erreur',
          description:
            'Une erreur est survenue lors de la suppression du favoris',
        });
      },
      onSuccess: async () => {
        toastSuccess({
          title: 'Suppression réussie',
          description:
            'La ZAC à été supprimée des favoris',
        });
        return callbackOnSuccess();
      },
    }
  );
}
