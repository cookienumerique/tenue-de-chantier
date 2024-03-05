import { useMutation } from '@tanstack/react-query';
import Axios from 'axios';

import useToastSuccess from '@/hooks/toast/useToastSuccess';
import MutationProps from '@/types/query/MutationProps';

/**
 * @description Add commentaire infraction lot
 */
const useCreateEvenementCommentaire = (
  props?: MutationProps<void>
) => {
  const {
    callbackOnSuccess = () => null,
    callbackOnError = () => null,
  } = props ?? {};
  const toastSuccess = useToastSuccess();
  return useMutation(
    (payload: { commentaire: string }) => {
      return Axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/evenements/commentaires`,
        payload
      );
    },
    {
      onError: (error) => {
        callbackOnError(error);
      },
      onSuccess: async () => {
        toastSuccess({
          title: 'Commentaire ajouté',
        });
        return callbackOnSuccess();
      },
    }
  );
};

export default useCreateEvenementCommentaire;
