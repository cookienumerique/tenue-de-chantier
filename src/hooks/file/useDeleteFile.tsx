import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';

import useToastError from '@/hooks/toast/useToastError';
import useToastSuccess from '@/hooks/toast/useToastSuccess';

type DeleteFilesProps = {
  callbackOnSuccess?: () => void;
  callbackOnError?: () => void;
};

/**
 * @description Delete a file by id
 * @param props
 */
export default function useDeleteFile(
  props: DeleteFilesProps = {}
) {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  return useMutation(
    (id: string) => {
      return Axios.delete(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/files/${id}`
      );
    },
    {
      onError: () => {
        callbackOnError();
        toastError({
          title: 'Erreur',
          description:
            'Une erreur est survenue lors de la suppression du fichier',
        });
      },
      onSuccess: async () => {
        toastSuccess({
          title: 'Suppression réussie',
          description:
            'Le fichier a été supprimé avec succès.',
        });
        return callbackOnSuccess();
      },
    }
  );
}
