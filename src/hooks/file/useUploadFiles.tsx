import { useMutation } from '@tanstack/react-query';
import Axios, { AxiosResponse } from 'axios';

import useToastError from '@/hooks/toast/useToastError';
import useToastSuccess from '@/hooks/toast/useToastSuccess';
import File from '@/interfaces/File';

type UploadFilesProps = {
  callbackOnSuccess?: (
    response: AxiosResponse<{ files: File[] }>
  ) => void;
  callbackOnError?: () => void;
};
export default function useUploadFiles(
  props: UploadFilesProps = {}
) {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  return useMutation(
    (payload: FormData) => {
      return Axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/files`,
        payload
      );
    },
    {
      onError: () => {
        callbackOnError();
        toastError({
          title: 'Erreur',
          description:
            'Une erreur est survenue lors du chargement des fichiers.',
        });
      },
      onSuccess: async (
        response: AxiosResponse<{ files: File[] }>
      ) => {
        toastSuccess({
          title: 'Chargement réussi',
          description:
            'Les fichiers ont été ajoutés avec succès.',
        });
        return callbackOnSuccess(response);
      },
    }
  );
}
