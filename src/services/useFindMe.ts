import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Utilisateur from '@/interfaces/Utilisateur';

/**
 * @description Retrieve the current user with its token
 */
const useFindMe = (
  { enabled }: { enabled: boolean } = { enabled: true }
) => {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isSuccess,
  } = useQuery(
    ['utilisateur-me'],
    async () =>
      (await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_HOST}/v1/utilisateurs/me`
      )) ?? {},
    { refetchOnMount: false, enabled }
  );
  const { utilisateur, token } =
    (response?.data as unknown as {
      utilisateur: Utilisateur;
      token: string;
    }) ?? {};

  return {
    invalidate: refetch,
    utilisateur,
    token,
    isSuccess,
    isError,
    isLoading,
  };
};

export default useFindMe;
